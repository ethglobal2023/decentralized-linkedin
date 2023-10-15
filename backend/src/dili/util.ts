import { supabase } from "../config.js";

import axios from "axios";

const MAX_SCORE_CALC_AGE = 30; //TODO move to config

export function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


export const rest_api_save_to_db = async (
  url: string,
  method: string,
  req_body: object = {},
  headers: object = {
    Accept: "application/json",
    "content-type": "application/json",
  },
  callback: any = (response: any) => {},
  max_age_days: number = 30,
  ops?: string
) => {
  if (ops != "recalc") {
    const { data } = await supabase
      .from("rest_cache")
      .select("*")
      .eq("url", url)
      .eq("method", method)
      .eq("req_body", req_body)
      .single();

    if (data !== null && data.updated_at !== null) {
      let last = new Date(Date.parse(data.updated_at));
      let today = new Date();
      console.log(dateDiffInDays(last, today));
      if (dateDiffInDays(last, today) < max_age_days) {
        callback(data.req_body);
        return data.req_body;
      }
    }
  }

  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: url,
    headers: headers,
    data: req_body,
  };

  1 === 1;

  try{
  let res = await axios.request(config);
  1 == 1;
  if (req_body === undefined || req_body === null) req_body = {};
  // @ts-ignore
  const { data, upsertError } = await supabase.from("rest_cache").upsert({
    url: url,
    method: method,
    req_body: req_body,
    response_body: res.data || {},
    status: res.status || 400,
  });

  if( upsertError)
    console.log(upsertError);
  1 === 1;
  return res.data;
} catch(error){
    console.error("error in rest_api_save_to_db   lin82 :"+error);
}
};

export const getWeb3BioNextId = async (pk: string) => {
    try {
   let res = await rest_api_save_to_db("https://api.web3.bio/profile/" + pk, "get");
   return res;
    }
    catch(error){
        console.error("error in getWeb3BioNextId()... if its a 404 ignore it b/c that just means they had no data: "+error)
        return [];
    }
};



/*
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://optimism.easscan.org/graphql' \
  --data '{"query":"query { __typename }"}'

*/

/*
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://optimism.easscan.org/graphql' \
    --data '{"query":"query Query($where: AttestationWhereInput) {  attestations(where: $where) {    id    data    attester    decodedDataJson    expirationTime    ipfsHash    isOffchain    recipient    refUID    revocable    revocationTime    revoked    schemaId    time    timeCreated    txid  }}","variables":{"where":{"recipient":{"equals":"0xA00c50A0A97D7b4d03e7Ff4A8C1badf61d72816f"}}}}'



curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://optimism.easscan.org/graphql' \
    --data '{"query":"query Query($where: AttestationWhereInput) {  attestations(where: $where) {    id    data    attester    decodedDataJson    expirationTime    ipfsHash    isOffchain    recipient    refUID    revocable    revocationTime    revoked    schemaId    time    timeCreated    txid  }}","variables":{"where":{"recipient":{"equals":"0xA00c50A0A97D7b4d03e7Ff4A8C1badf61d72816f"}}}}'
    */
