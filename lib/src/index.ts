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


const MIN_SPACES_IN_VALUE_TO_CONSIDER_NON_TECHNICAL=3;
const MAX_LENGTH_NON_SENTENCE_VALUES=20;
const ALWAYS_PRINT_KEYS_CONTAINING=["name","title","description","title","keyword"];
const NEVER_PRINT_KEYS=["vc","value","link","dns","id","href","icon","type","issuer","isbn","start","end","date","cid","doi","level"];


function keyNamingToTitle(text: string){
  return (
    text.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace("_"," ")
      .replace(/([A-Z]+)([A-Z][a-z]+)/g, '$1 $2')
      .replace(/^./, m => m.toUpperCase())
  );
}

export function recursionResumeToString( d: any , prefixpath: string){
  let out="";

  if( d === null )
    return "";

  if( typeof(d)==="string"  && ( d.split(" ").length>=MIN_SPACES_IN_VALUE_TO_CONSIDER_NON_TECHNICAL || d.length<MAX_LENGTH_NON_SENTENCE_VALUES )){
    return (keyNamingToTitle(prefixpath)+": "+d+`\n`)
  }
  let nextprefixpath=prefixpath;
  if( typeof(d) ==="object"){
    Object.keys(d).forEach(k=>{
      if(!NEVER_PRINT_KEYS.includes(k)){
        if( isNaN(parseInt(k))){
          out=out+recursionResumeToString(d[k],prefixpath+" "+keyNamingToTitle(k))
        }
        else{
          out=out+recursionResumeToString(d[k],prefixpath)
        }
      }


    })
    return out;
  }
  else
    return "";


}