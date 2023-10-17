import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./__generated__/supabase-types.js";
import { Attestation } from "./__generated__/graphql.js";
import axios from "axios";

type AttestationWithChainID = Attestation & { chainID: string };

//For now this is only looking on optimism ,  but we should do all other chains
export const getAllAttestations = async (
  supabase: SupabaseClient<Database>,
  pk: string
) => {
  let offChain: Database["public"]["Tables"]["attestations"]["Row"][] | null = [];
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
        txid: ""
      });
    });
  }

  console.log("all=" + JSON.stringify(all));
  return all;
};

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
