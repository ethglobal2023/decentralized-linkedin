import {
  Offchain,
  OFFCHAIN_ATTESTATION_VERSION,
  PartialTypedDataConfig,
} from "@ethereum-attestation-service/eas-sdk";
import { hexlify, Signature, verifyTypedData } from "ethers";

export type VerifyEasRequest = {
  sig: any;
  signer: string;
};

export const signatureIsFromAttester = (
  attester: string,
  request: VerifyEasRequest
) => {
  const EAS_CONFIG: PartialTypedDataConfig = {
    address: request.sig.domain.verifyingContract,
    version: request.sig.domain.version,
    chainId: request.sig.domain.chainId,
  };

  // const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
  const offchain = new Offchain(EAS_CONFIG, OFFCHAIN_ATTESTATION_VERSION);
  console.log(attester);
  console.log(request);
  console.log(request.sig.types);
  return offchain.verifyOffchainAttestationSignature(
    request.signer,
    request.sig
  );
};

export const extractAddressFromAttestation = (
  attestation: VerifyEasRequest
) => {
  const sig = Signature.from({
    v: attestation.sig.signature.v,
    r: hexlify(attestation.sig.signature.r),
    s: hexlify(attestation.sig.signature.s),
  }).serialized;
  return verifyTypedData(
    attestation.sig.domain,
    attestation.sig.types,
    attestation.sig.message,
    sig
  );
};
