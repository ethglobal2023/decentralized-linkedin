import {NextFunction, Request, Response} from "express";
import {logger} from "../index.js";
import Joi from "joi";
import {extractAddressFromAttestation, getComposeClient, signatureIsFromAttester, VerifyEasRequest} from "./index.js";
import {config} from "../config.js";
import {Signature} from "ethers";
import {EIP712DomainTypedData} from "@ethereum-attestation-service/eas-sdk/dist/offchain/typed-data-handler.js";

const attestationRequestSchema = Joi.object({
    uid: Joi.string().required(),
    account: Joi.string().required(),
    signature: Joi.object({
        r: Joi.string().required(),
        s: Joi.string().required(),
        v: Joi.number().required(),
    }).required(),
    types: Joi.any().required(), //TODO Figure out what this type is
    domain: Joi.object({
        name: Joi.string().required(),
        version: Joi.number().required(),
        chainId: Joi.number().optional(),
        verifyingContract: Joi.string().required(),
    }),
    primaryType: Joi.string().required(),
    message: Joi.object({
        schema: Joi.string().required(),
        version: Joi.number().required(),
        recipient: Joi.string().required(),
        refUID: Joi.string().required(),
        data: Joi.string().required(),
        time: Joi.number().required(),
        expirationTime: Joi.number().optional(),
        revocable: Joi.boolean().optional(),
        nonce: Joi.number().optional(),
    }),
});

export type CreateEasRequest = {
    uid: string,
    account: string,
    signature: Signature,
    types: any, //TODO figure out what this type is
    domain: EIP712DomainTypedData,
    primaryType: string,
    message: any
}

// The EAS format supplied matches when it's fetched from Ceramic, but doesn't match when it's created through the app
// This is because the message has additional fields to prevent replay attacks
// This function converts the format from the app to the format fetched from Ceramic
const appAttestationToEASFormat = (data: CreateEasRequest): VerifyEasRequest => {
    return {
        sig: {
            domain: {
                name: "EAS Attestation",
                version: data.domain.version,
                chainId: data.domain.chainId,
                verifyingContract: data.domain.verifyingContract,
            },
            primaryType: "Attest",
            types: data.types,
            signature: data.signature,
            uid: data.uid,
            message: {
                version: data.message.version,
                schema: data.message.schema,
                refUID: data.message.refUID,
                time: data.message.time,
                expirationTime: 0,
                recipient: data.message.recipient,
                attester: data.message.attester,
                revocable: true,
                data: data.message.data,
            },
        },
        signer: data.account,
    };
}


export const createNewAttestation = async (req: Request, res: Response, next: NextFunction) => {
    // Attestation is verified in middleware before this function is called
    logger.debug("Attestation request:", req.body)
    logger.debug("Creating new attestation")

    const {error, value} = attestationRequestSchema.validate(req.body);
    if (error) {
        logger.error("Attestation request validation error:", error)
        return res.status(400).send(error.details[0].message);
    }

    const {message, uid, account, domain, types, signature} = value;

    const verificationRequest = appAttestationToEASFormat(value)
    if (!signatureIsFromAttester(account, verificationRequest)) {
        const recoveredAddress = extractAddressFromAttestation(verificationRequest);
        logger.debug(`Signature is not from the attester. Expected: ${account}, signer: ${recoveredAddress}`)
        return res.status(401).send("Signature is not from the attester")
    }

    if(message.recipient === account) {
        logger.debug(`Attestation recipient is the same as the attester.`)
        return res.status(401).send("Attestation recipient is the same as the attester")
    }

    if (value.attester !== config.ceramicIssuerAddress) {
        logger.warn(`Signature is not from the trusted issuer. Expected: ${config.ceramicIssuerAddress}, signer: ${account}`)
        return res.status(401).send("Signature is not from the trusted issuer")
    }

    try {
        const composeClient = await getComposeClient();
        const data: any = await composeClient.executeQuery(`
          mutation {
            createAttestation(input: {
              content: {
                uid: "${uid}"
                schema: "${message.schema}"
                attester: "${account}"
                verifyingContract: "${domain.verifyingContract}"
                easVersion: "${domain.version}"
                version: ${message.version}
                chainId: ${domain.chainId}
                r: "${signature.r}"
                s: "${signature.s}"
                v: ${signature.v}
                recipient: "${message.recipient}"
                refUID: "${message.refUID}"
                data: "${message.data}"
                time: ${message.time}
              }
            })
            {
              document {
                id
                uid
                schema
                attester
                verifyingContract
                easVersion
                version
                chainId
                types{
                  name
                  type
                }
                r
                s
                v
                recipient
                refUID
                data
                time
              }
            }
          }
        `);

        logger.debug("Attestation created:", data);

        if (data.data.createAttestation.document.id) {  // TODO, create type when the schema is published
            logger.debug("Attestation created successfully")
            return res.json(data);
        } else {
            logger.error("There was an error processing your write request", data)
            return res.json({
                error: "There was an error processing your write request",
            });
        }
    } catch (err) {
        logger.error("Outermost exception caught in createNewAttestation", err)
        res.json({
            err,
        });
    }
}
