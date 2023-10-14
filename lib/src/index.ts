import {
  AttestationShareablePackageObject,
  Offchain,
  OFFCHAIN_ATTESTATION_VERSION,
  PartialTypedDataConfig,
} from "@ethereum-attestation-service/eas-sdk";
import { hexlify, Signature, verifyTypedData } from "ethers";

export const validAttestation = (
  document: AttestationShareablePackageObject
) => {
  const EAS_CONFIG: PartialTypedDataConfig = {
    address: document.sig.domain.verifyingContract,
    version: document.sig.domain.version,
    chainId: document.sig.domain.chainId,
  };

  // const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
  const offchain = new Offchain(EAS_CONFIG, OFFCHAIN_ATTESTATION_VERSION);
  return offchain.verifyOffchainAttestationSignature(
    document.signer,
    document.sig
  );
};

export const batchVerifyAttestations = (
  documents: AttestationShareablePackageObject[]
) => {
  for (const attestation of documents) {
    if (!validAttestation(attestation)) {
      return false;
    }
  }
};

export const extractAddressFromAttestation = (
  attestation: AttestationShareablePackageObject
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
