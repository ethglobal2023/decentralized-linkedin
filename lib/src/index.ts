import {
  AttestationShareablePackageObject,
  Offchain,
  OFFCHAIN_ATTESTATION_VERSION,
  PartialTypedDataConfig,
} from "@ethereum-attestation-service/eas-sdk";
import { hexlify, Signature, verifyTypedData } from "ethers";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./__generated__/supabase-types.js";
import { Attestation } from "./__generated__/graphql.js";
import axios from "axios";

type AttestationWithChainID = Attestation & { chainID: string };

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

export const bulkVerifyAttestations: (
  documents: AttestationShareablePackageObject[]
) => {
  validAttestations: AttestationShareablePackageObject[];
  invalidAttestations: AttestationShareablePackageObject[];
} = (documents) => {
  const validAttestations: AttestationShareablePackageObject[] = [];
  const invalidAttestations: AttestationShareablePackageObject[] = [];
  for (const attestation of documents) {
    const valid = verifyAttestation(attestation);
    if (valid) {
      validAttestations.push(attestation);
    } else {
      invalidAttestations.push(attestation);
    }
  }
  return { validAttestations, invalidAttestations };
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

const MIN_SPACES_IN_VALUE_TO_CONSIDER_NON_TECHNICAL = 3;
const MAX_LENGTH_NON_SENTENCE_VALUES = 20;
const ALWAYS_PRINT_KEYS_CONTAINING = [
  "name",
  "title",
  "description",
  "title",
  "keyword",
];
const NEVER_PRINT_KEYS = [
  "vc",
  "value",
  "link",
  "dns",
  "id",
  "href",
  "icon",
  "type",
  "issuer",
  "isbn",
  "start",
  "end",
  "date",
  "cid",
  "doi",
  "level",
];

function keyNamingToTitle(text: string) {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace("_", " ")
    .replace(/([A-Z]+)([A-Z][a-z]+)/g, "$1 $2")
    .replace(/^./, (m) => m.toUpperCase());
}

export function recursionResumeToString(d: any, prefixpath: string) {
  let out = "";

  if (d === null) return "";

  if (
    typeof d === "string" &&
    (d.split(" ").length >= MIN_SPACES_IN_VALUE_TO_CONSIDER_NON_TECHNICAL ||
      d.length < MAX_LENGTH_NON_SENTENCE_VALUES)
  ) {
    return keyNamingToTitle(prefixpath) + ": " + d + `\n`;
  }
  let nextprefixpath = prefixpath;
  if (typeof d === "object") {
    Object.keys(d).forEach((k) => {
      if (!NEVER_PRINT_KEYS.includes(k)) {
        if (isNaN(parseInt(k))) {
          out =
            out +
            recursionResumeToString(
              d[k],
              prefixpath + " " + keyNamingToTitle(k)
            );
        } else {
          out = out + recursionResumeToString(d[k], prefixpath);
        }
      }
    });
    return out;
  } else return "";
} //For now this is only looking on optimism ,  but we should do all other chains
export const getOnChainAttestations = async (
  url: string,
  pk: string
): Promise<Attestation[]> => {
  //get on chain attestaitons
  let query = `
    query Query($where: AttestationWhereInput) {
      attestations(where: $where) {
        id
        data
        attester
        decodedDataJson
        expirationTime
        ipfsHash
        isOffchain
        recipient
        refUID
        revocable
        revocationTime
        revoked
        schemaId
        time
        timeCreated
        txid
      }
    }
  `;
  let variables = { where: { recipient: { equals: pk } } };

  console.log("LOOOK HERE variables=" + JSON.stringify(variables));

  //let res =await axios.post("https://optimism.easscan.org/graphql",{query:query,variables:variables})

  // +1 for attestation, + gitcoin passport score
  // 0x843829986e895facd330486a61Ebee9E1f1adB1a

  const res = await axios.post(
    url,
    { query: query, variables: variables },
    { headers: { "Content-Type": "application/json" } }
  );

  console.log(`Fetched onchain attestations for ${pk} from ${url}`);

  return res!.data!.data!.attestations;
};
export const getAllAttestations = async (
  supabase: SupabaseClient<Database>,
  pk: string
) => {
  let offChain: Database["public"]["Tables"]["attestations"]["Row"][] | null =
    [];
  //get internall offchain attestations
  try {
    const { data, error } = await supabase
      .from("attestations")
      .select("*")
      .eq("recipient_address", pk);
    if (error) {
      console.error(`Failed to fetch offchain attestations: ${error}`);
    }
    offChain = data;
  } catch (e: any) {
    console.error(`Failed to fetch offchain attestations: ${e}`);
  }
  const urls = {
    1: "https://easscan.org/graphql",
    42161: "https://arbitrum.easscan.org/graphql",
    10: "https://optimism.easscan.org/graphql",
    59144: "https://linea.easscan.org/graphql",
    11155111: "https://sepolia.easscan.org/graphql",
    420: "https://optimism-goerli-bedrock.easscan.org/graphql",
    84531: "https://base-goerli.easscan.org/graphql",
  };

  const all: AttestationWithChainID[] = [];

  //get on chain attestations
  const promises = Object.entries(urls).map(async ([chainID, url]) => {
    try {
      console.log("chainID=" + chainID + " url=" + url);
      const res = await getOnChainAttestations(url, pk);
      for (let i = 0; i < res.length; i++) {
        all.push({ ...res[i], chainID: chainID });
      }
    } catch (e: any) {
      //TODO handle this better
      console.error(`Failed to fetch onchain attestations from ${url}: ${e}`);
    }
  });

  await Promise.all(promises);

  if (offChain && !!offChain.forEach) {
    // @ts-ignore
    offChain?.map((r) => {
      all.push(<Attestation & { chainID: string }>{
        chainID: "-1",
        id: r.id,
        data: "" + r.type,
        attester: r.attester_address,
        decodedDataJson: JSON.stringify(r.document),
        isOffchain: true,
        recipient: r.recipient_address,
        refUID: r.ref_uid,
        revoked: r.revoked,
        revocable: true,
        schemaId: r.eas_schema_address,
        timeCreated: parseInt(r.created_at),
        revocationTime: r.expiration_time,
        expirationTime: r.expiration_time,
        ipfsHash: "",
        schema: {},
        time: 0,
        txid: "",
      });
    });
  }

  console.log("all=" + JSON.stringify(all));
  return all;
};
