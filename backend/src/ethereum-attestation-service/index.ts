import {ComposeClient} from "@composedb/client";
import {RuntimeCompositeDefinition} from "@composedb/types";
import {definition} from "../__generated__/definition.js";
import {CeramicClient} from "@ceramicnetwork/http-client";
import {config} from "../config.js";
import {authenticateIssuerDID} from "./lib.js";
import {
    EAS,
    Offchain,
    OffChainAttestationVersion,
    PartialTypedDataConfig,
    SignedOffchainAttestation,
} from "@ethereum-attestation-service/eas-sdk";
import {hexlify, Signature, verifyTypedData} from "ethers";

export const ceramicClient = new CeramicClient(config.ceramicUrl);

// TODO clean this up, we shouldn't have to initialize it on every run
export const getComposeClient = async () => {
    const composeClient: ComposeClient = new ComposeClient({
        ceramic: config.ceramicUrl,
        definition: definition as RuntimeCompositeDefinition,
    });
    const did = await authenticateIssuerDID(config.ceramicKey);
    composeClient.setDID(did);
    return composeClient
};

export const signatureIsFromAttester = (attester: string, request: SignedOffchainAttestation) => {
    const EAS_CONFIG: PartialTypedDataConfig = {
        address: request.domain.verifyingContract,
        version: request.domain.version,
        chainId: request.domain.chainId,
    };
    const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

    // Initialize the sdk with the address of the EAS Schema contract address
    const eas = new EAS(EASContractAddress);

    const offchain = new Offchain(
        EAS_CONFIG,
        OffChainAttestationVersion.Version1,
        eas
    );
    return offchain.verifyOffchainAttestationSignature(
        attester,
        request
    );
}
export const extractAddressFromAttestation = (attestation: SignedOffchainAttestation) => {
    const sig = Signature.from({v: attestation.signature.v, r: hexlify(attestation.signature.r), s: hexlify(attestation.signature.s)}).serialized;
    return verifyTypedData(attestation.domain, attestation.types, attestation.message, sig);
}
