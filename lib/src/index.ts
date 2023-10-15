import {
  AttestationShareablePackageObject,
  Offchain,
  OFFCHAIN_ATTESTATION_VERSION,
  PartialTypedDataConfig,
} from "@ethereum-attestation-service/eas-sdk";
import { hexlify, Signature, verifyTypedData } from "ethers";

export const verifyAttestation = (
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

export const bulkVerifyAttestations: (documents: AttestationShareablePackageObject[]) => {validAttestations: AttestationShareablePackageObject[], invalidAttestations: AttestationShareablePackageObject[]} = (
  documents
) => {
  const validAttestations: AttestationShareablePackageObject[] = [];
  const invalidAttestations: AttestationShareablePackageObject[] = [];
  for (const attestation of documents) {
    const valid = verifyAttestation(attestation)
    if (valid) {
      validAttestations.push(attestation);
    } else {
      invalidAttestations.push(attestation);
    }
  }
  return {validAttestations, invalidAttestations}
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

