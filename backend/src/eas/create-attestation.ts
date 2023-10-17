import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import { AttestationShareablePackageObject } from "@ethereum-attestation-service/eas-sdk";
import {
  extractAddressFromAttestation,
  verifyAttestation,
} from "lib";

export type CreateAttestationRequest = {
  uid: string;
  account: string;
  signature: {
    r: string;
    s: string;
    v: number;
  };
  types: any; // The exact type needs to be determined
  domain: {
    name: string;
    version: string;
    chainId?: number;
    verifyingContract: string;
  };
  primaryType: string;
  message: {
    schema: string;
    version: number;
    recipient: string;
    refUID: string;
    data: string;
    time: number;
    expirationTime?: number;
    revocable?: boolean;
    nonce?: number;
  };
  attestationType: //TODO add check to db
  | "todo"
    | "humanity"
    | "met_irl" //Left here so old code samples work
    | "resume"
    | "review"
    | "media"
    | "publicInterview";
};

const attestationRequestSchema = Joi.object<CreateAttestationRequest>({
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
    version: Joi.string().required(),
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
  attestationType: Joi.string().valid(
    "todo",
    "humanity",
    "met_irl",
    "resume",
    "review",
    "confirmed_skill",
    "confirmed_language",
  ),
});

// The EAS format supplied matches when it's fetched from Ceramic, but doesn't match when it's created through the app
// This is because the message has additional fields to prevent replay attacks
// This function converts the format from the app to the format fetched from Ceramic
const appAttestationToEASFormat = (
  data: any,
): AttestationShareablePackageObject => {
  const attestation2 = {
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
        attester: data.account,
        revocable: true,
        data: data.message.data,
      },
    },
    signer: data.account,
  };

  console.log("Post transformation2:", attestation2);
  return attestation2;
};

export const createNewAttestation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("Create attestation request:", req.body);

  const { error: validationError, value } = attestationRequestSchema.validate(
    req.body,
  );
  if (validationError) {
    logger.error("Attestation request validation error:", validationError);
    return res.status(400).send(validationError.details[0].message);
  }

  const { message, uid, account, domain, types, signature, attestationType } =
    value;

  const easDocument = appAttestationToEASFormat(value);
  if (!verifyAttestation(easDocument)) {
    const recoveredAddress = extractAddressFromAttestation(easDocument);
    logger.debug(
      `Signature is not from the attester. Expected: ${account}, signer: ${recoveredAddress}`,
    );
    return res.status(401).send("Signature is not from the attester");
  }
  //
  if (message.recipient === account) {
    logger.debug(`Attestation recipient is the same as the attester.`);
    return res
      .status(401)
      .send("Attestation recipient is the same as the attester");
  }

  const adminAccount = supabase
    .from("admin_signers")
    .select("account")
    .single();
  if (!adminAccount) {
    logger.warn(
      `Signature is not from an admin account, got signer: ${account}`,
    );
    return res.status(401).send("Signature is not from the trusted issuer");
  }

  const { error } = await supabase.from("attestations").insert({
    id: uid,
    ref_uid: message.refUID,
    attester_address: account,
    recipient_address: message.recipient,
    eas_schema_address: message.schema,
    revoked: false,
    type: attestationType,
    expiration_time: 0, //TODO, make sure this is populated in the ui
    document: JSON.stringify(easDocument),
  });

  if (error) {
    logger.error("Failed to insert attestation error:", error);
    res.status(500).json({ error: `Failed to insert attestation: ${error}` });
  }
  const { data, error: selectError } = await supabase
    .from("attestations")
    .select()
    .eq("id", uid);
  console.log("Attestation created:", data);

  if (selectError) {
    logger.error("Failed to select attestation error:", selectError);
    res
      .status(500)
      .json({ error: `Failed to select attestation: ${selectError}` });
  }

  return res.status(200).send(data);
};
