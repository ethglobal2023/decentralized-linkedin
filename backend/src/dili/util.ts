import { supabase } from "../config.js";

import axios from "axios";

const MAX_SCORE_CALC_AGE = 30; //TODO move to config

import { init, fetchQuery } from "@airstack/node";

const airstackAPIKeys = [  //TODO move to config  and gitignore 
  "148c64fde3cf4c078d5da3c559b6aac4",
  "169e231a545547c5b40781506374a97a",
  "0704529f3d0540ecaa192a42562bfcf5",
  "4e7245eed2db4b8287fa336d1fc56c6a",
  "f3c4a4085fb644cc9293756decea426d",
];



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
  const { data, error } = await supabase.from("rest_cache").upsert({
    url: url,
    method: method,
    req_body: req_body,
    response_body: res.data || {},
    status: res.status || 400,
  });
  let upsertError=error;

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


const airstackquery_farcaster_iterate=`query GetAllFarcasterUsernamesAndEthAddresses {
  Socials(
    input: {filter: {dappName: {_eq: farcaster}, followerCount: {_gt: 2}}, blockchain: ethereum, limit: 200, cursor: ""}
  ) {
    Social {
      profileName
      userAssociatedAddresses
      followerCount
      fnames
      profileBio
      profileImage
      profileDisplayName
      userRecoveryAddress
    }
    pageInfo {
      hasNextPage
      nextCursor
    }
  }
}`


let apiKeyIndex = 2;

// Function to get the current API key
function getCurrentApiKey() {
  return airstackAPIKeys[apiKeyIndex];
}

// Function to rotate to the next API key
function rotateApiKey() {
  apiKeyIndex = (apiKeyIndex + 1) % airstackAPIKeys.length;
}

export const airStackFarCaster = async ()=>{


  const pagelimit =10;

let currentApiKey="cfba1e8625d040d99b2c49f51960891b";
  init(currentApiKey);
  let currentcursor="";
  let lastDownload ;
  //@ts-ignore
  let all=[];
  for (let i = 0; i < pagelimit; i++) {
    let curQuery = `query GetAllFarcasterUsernamesAndEthAddresses {
      Socials(
        input: {filter: {dappName: {_eq: farcaster}, followerCount: {_gt: 100}}, blockchain: ethereum, limit: 200, cursor: "${currentcursor}"}
      ) {
        Social {
          profileName
          userAssociatedAddresses
          followerCount
          fnames
          profileBio
          profileImage
          profileDisplayName
          userRecoveryAddress
          profileTokenId
          profileTokenAddress
          profileLastUpdatedAtBlockNumber
          chainId
          dappName
        }
        pageInfo {
          hasNextPage
          nextCursor
        }
      }
    }`


    console.log(" i = "+i)
    console.log("before  airstack fetchQuery")
    const { data, error } = await fetchQuery(curQuery);
    lastDownload= data?.Socials?.Social;


    console.log("data?.Socials?.pageInfo.nextCursor "+data?.Socials?.pageInfo.nextCursor)
    console.log("data?.Socials?.pageInfo.hasNextPage "+data?.Socials?.pageInfo.hasNextPage)
    console.log("after  airstack fetchQuery")
    
    //console.log("----------- "+JSON.stringify(lastDownload))


      //lastDownload =  await rest_api_save_to_db("https://optimism.easscan.org/graphql",'post',{query:curQuery},{ "Content-Type": "application/json" })


      for (let x = 0; x < lastDownload.length; x++) {
        const { data,error } = await supabase.from("farcaster_users").upsert({
          userAssociatedAddresse: lastDownload[x].userAssociatedAddresses[0]||"",
          profileTokenId: lastDownload[x].profileTokenId,
          userAssociatedAddresses_all:lastDownload[x].userAssociatedAddresses,
          json: lastDownload[x],
          source: 'airstack'
        });
        console.log("----------- Finished inserting into supabase -- \n "+JSON.stringify(lastDownload[x]))

        
      }

      if (lastDownload) {
        //@ts-ignore
        all=[...lastDownload,...all]
      }
      
      1===1
      console.log(" i = "+i+" i = "+i+" i = "+i+" i = "+i+" i = "+i+" i = "+i)
      if(data?.Socials?.pageInfo.hasNextPage  )
         currentcursor=data?.Socials?.pageInfo.nextCursor  || "";
      else 
        break;
  }
  //@ts-ignore
  return (all);
}

export const crawlEAS = async ()=>{
 

const eas_lots_of_attestations_graphql_query=`query derpderp($take: Int, $skip: Int) {
  attestations(take:$take skip: $skip){
    recipient
    attester
    id
    time
    txid
    schemaId
  }
}`;

const eas_get_distinct_recipeints=`query Attestations($distinct: [AttestationScalarFieldEnum!]) {
  attestations(distinct: $distinct) {
    recipient
  }
}`



let payload_all_eass = { query:eas_get_distinct_recipeints,
      variables:{
      "distinct": "recipient"
    }
    }

  let alleasrecp = await rest_api_save_to_db("https://optimism.easscan.org/graphql",'post',payload_all_eass,{ "Content-Type": "application/json" })


  1==1;
 return(alleasrecp);
}



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
