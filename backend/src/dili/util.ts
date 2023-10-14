import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";

import axios from "axios";

/*

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const calcTrustScore = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Attestation is verified in middleware before this function is called
    logger.debug("Start trust score calc:", req.body);
  
  };  


  */

const MAX_SCORE_CALC_AGE = 30; //TODO move to config

export function dateDiffInDays(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/*
export const rest_get_and_save_to_db= async(url:string, headers:object={Accept: 'application/json', "content-type":'application/json'}, callback:any =(response: any) => {}, max_age_days:number=30, ops?:string)=>{


    //TODO should add http response STATUS to the DB or atleast consider it when deciding to save or not to db. Right now I jsut save it so errors would save empty insert. 
    if(ops!="recalc"){
        const {data} = await supabase
        .from("get_rest_cache")
        .select("*")
        .eq("url",url)
        .single();
 
            if(data!==null&&data.updated_at!==null){
                let last=  new Date(Date.parse(data.updated_at));
                let today= new Date();
                console.log( dateDiffInDays(last,today))
                if( dateDiffInDays(last,today) <max_age_days  ){
                    callback(data.response);
                    return data.response;
                } 
    
        
        }
    }

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
        headers: headers
      };

      // @ts-ignore
     async function save_res_to_db(url,res){
        const {data} = await supabase
        .from("get_rest_cache")
        .upsert({url:url,response:res.body,status:res.status})
     }
      await axios.request(config).then((response) => {save_res_to_db(url,response); callback(response); return(response)}).catch((error) => {console.error(error);});
}
*/

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
  // @ts-ignore
  /*
     async function save_res_to_db(url,res){
        const {data} = await supabase
        .from("get_rest_cache")
        .upsert({url:url,method:method,req_body:req_body, response:res.response_body,status:res.status})
     }
     */

  1 === 1;
  //await axios.request(config).then((response) => {save_res_to_db(url,response); callback(response); return(response)}).catch((error) => {console.error(error);});

  try{
  let res = await axios.request(config);
  1 == 1;
  if (req_body === undefined || req_body === null) req_body = {};
  // @ts-ignore
  const { data, upsertError } = await supabase.from("rest_cache").upsert({
    url: url,
    method: method,
    req_body: req_body,
    response_body: res.data,
    status: res.status,
  });

  if( upsertError)
    console.log(upsertError);
  1 === 1;
  return res.data;
} catch(error){
    console.error("error in rest_api_save_to_db  :"+error);
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

//For now this is only looking on optimism ,  but we should do all other chains
export const getAllAttestations = async (pk: string) => {
  //let getall_attestions_filter_receipiant_pk=JSON.parse('{"query":"query Query($where: AttestationWhereInput) {  attestations(where: $where) {    id    data    attester    decodedDataJson    expirationTime    ipfsHash    isOffchain    recipient    refUID    revocable    revocationTime    revoked    schemaId    time    timeCreated    txid  }}","variables":{"where":{"recipient":{"equals":"'+pk+'"}}}}');

  let query =
    "query Query($where: AttestationWhereInput) {  attestations(where: $where) {    id    data    attester    decodedDataJson    expirationTime    ipfsHash    isOffchain    recipient    refUID    revocable    revocationTime    revoked    schemaId    time    timeCreated    txid  }}";
  let variables = { where: { recipient: { equals: pk } } };

  console.log("LOOOK HERE variables=" + JSON.stringify(variables));

  //let res =await axios.post("https://optimism.easscan.org/graphql",{query:query,variables:variables})

  // +1 for attestation, + gitcoin passport score
  // 0x843829986e895facd330486a61Ebee9E1f1adB1a

  try{
  const res = await rest_api_save_to_db(
    "https://optimism.easscan.org/graphql",
    "post",
    { query: query, variables: variables },
    {}
  );
  console.log(
    "🚀 ~ file: util.ts:172 ~ getAllAttestations ~ res:",
    res!.data.attestations
  );
  return res!.data.attestations;
  }
  catch(error){
    console.log(
        "🚀 ~ file: util.ts:193 ~ getAllAttestations ~ error:",        error) 
    return [];
  }
  1 === 1;
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
