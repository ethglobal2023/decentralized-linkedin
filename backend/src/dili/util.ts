import { supabase } from "../config.js";
import * as fs from "fs";
import axios from "axios";
import { x_client } from "../config.js";




const MAX_SCORE_CALC_AGE = 30; //TODO move to config

import { init, fetchQuery } from "@airstack/node";

const airstackAPIKeys = [  //TODO move to config  and gitignore 
  "cfba1e8625d040d99b2c49f51960891b",  
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

      //{"profileName":"cryptomiyagi","userAssociatedAddresses":["0x8e349f70fc7760bbaa0efbca706503095ece899c","0xc92b56eec24b3405afb08ee7215fd50725fa7df7"],"followerCount":162,"fnames":["cryptomiyagi"],"profileBio":"Web3 Renaissance Man. Surreal AI artist and Photographer! https://foundation.app/@CryptoMiyagi_","profileImage":"https://i.imgur.com/0lPN65V.jpg","profileDisplayName":"CryptoMiyagi_","userRecoveryAddress":"0x00000000fcd5a8e45785c8a4b9a718c9348e4f18","profileTokenId":"14200","profileTokenAddress":"0x00000000fcaf86937e41ba038b4fa40baa4b780a","profileLastUpdatedAtBlockNumber":108875188,"chainId":"10","dappName":"farcaster"}

      //{"pubkey":"0xf3c24e5ff3975fddc49b254bc8350b1abf2342a0","preferredname":"faraon","preferredtitle":"dev","description":"faraon developments","skill_keywords":"blockchain","preferredlocation":null,"id":"11713","cid":"QmRRYfTGEQ1G7mbGuziDoeFPXKjYZjTUcTSEJp9tD6esnu","address":"0xf3c24e5ff3975fddc49b254bc8350b1abf2342a0","}



      for (let x = 0; x < lastDownload.length; x++) {
        const row=lastDownload[x];

        const resumejson={pubkey:row.userAssociatedAddresses[0],preferredname:row.profileDisplayName,preferredtitle:row.fnames[0]||"",description:row.profileBio,preferredlocation:null,address:row.userAssociatedAddresses[0],profileImage:row.profileImage}

        const { data,error } = await supabase.from("farcaster_users").upsert({
          userAssociatedAddresse:row.userAssociatedAddresses[0]||"",
          profileTokenId: row.profileTokenId,
          userAssociatedAddresses_all:row.userAssociatedAddresses,
          json: row,
          resumejson :resumejson,
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




const XMTPQuery = `query BulkFetchPrimaryENSandXMTP($address: [Identity!]) {
  XMTPs(input: {blockchain: ALL, filter: {owner: {_in: $address}}}) {
    XMTP {
      isXMTPEnabled
      owner {
        addresses
        primaryDomain {
          name
        }
        domains{
          name
          labelName
        }
        socials {
          dappName
          profileName
          profileCreatedAtBlockTimestamp
          profileCreatedAtBlockTimestamp
          profileLastUpdatedAtBlockNumber
          profileLastUpdatedAtBlockTimestamp
          userAddress
          followerCount
          followingCount
          profileBio
          profileUrl
          profileName
          profileImage
          userHomeURL
          userAssociatedAddresses
          dappName
        }
        
      }
    }
  }
 
}`;



const XMTPOnlyQuery = `query BulkFetchPrimaryENSandXMTP($address: [Identity!]) {
  XMTPs(input: {blockchain: ALL, filter: {owner: {_in: $address}}}) {
    XMTP {
      isXMTPEnabled
      owner {
        addresses
        primaryDomain {
          name
        }
      }
    }
  }
 
}`;




export const checkAllForXMTP = async ()=>{




type User = {
  address: string;
  id: string;
  cid?: string;
  tokenId?: string;
  score?: number;
  document: {
    numReviews?: string;
    handle?: string;
    rating?: string;
    description?: any;
    index?: string;
    transactionHash?: string;
  };
};

 
 
/*
const airstackAPIKeys = [
  "148c64fde3cf4c078d5da3c559b6aac4",
  "169e231a545547c5b40781506374a97a",
  "0704529f3d0540ecaa192a42562bfcf5",
  "4e7245eed2db4b8287fa336d1fc56c6a",
  "f3c4a4085fb644cc9293756decea426d",
];
*/
const airstackAPIKeys = [ "148c64fde3cf4c078d5da3c559b6aac4"];
 

let apiKeyIndex = 0;

// Function to get the current API key
function getCurrentApiKey() {
  return airstackAPIKeys[apiKeyIndex];
}

// Function to rotate to the next API key
function rotateApiKey() {
  if(airstackAPIKeys.length>1)
    apiKeyIndex = (apiKeyIndex + 1) % airstackAPIKeys.length;
  else
  airstackAPIKeys[0];
}

const wallets: string[] = [];


queryWallets(wallets).then((allUsers) => {
  console.log("All Users:", allUsers);
  fs.writeFileSync("results3.json", JSON.stringify(allUsers, null, 2));
});
 
}



export const queryWallets = async (wallets: string[]) => {
  console.log("starting queryWallets() ");
  console.log("wallets.length", wallets.length);
  const results = [];
  console.log("started");

  // Batch processing
  const batchSize = 50;
  for (let i = 0; i < wallets.length; i += batchSize) {
    const batch = wallets.slice(i, i + batchSize);

    // API key rotation logic here
    //const currentApiKey = getCurrentApiKey();
    const currentApiKey = "cfba1e8625d040d99b2c49f51960891b";

    let userData;
    if (batch.length > 0) {
      try {
        console.log("currentApiKey= "+currentApiKey);
        init(currentApiKey);

        const { data, error } = await fetchQuery(XMTPOnlyQuery, { address: batch });
        userData = data;
        if(data && data?.XMTPs?.XMTP)
         console.log("data.XMTPs.XMTP.length ", data?.XMTPs?.XMTP?.length);
        

      // Make the API request for the batch
      if (userData?.XMTPs?.XMTP) {
        results.push(...userData?.XMTPs?.XMTP!);
            for (let s = 0; s < userData.XMTPs.XMTP.length; s+=1) {
                const e= userData.XMTPs.XMTP[s];
                    console.log("userData.XMTPs.XMTP.e ======= "+JSON.stringify(e))
                      //@ts-ignore
                    const { data3, error } = await supabase.from("on_xmtp").upsert({
                      pk: e.owner.addresses[0]||"",
                      on_xmtp: e.isXMTPEnabled,
                    });
                      //@ts-ignore
                        const { error3 } = await supabase.from('people_search').update({ on_xmtp:  e.isXMTPEnabled}).eq('pk', e.owner.addresses[0])
                }
        }


      } catch (err) {
        console.log("errorerrorerrorerrorerrorerror error", err);
      }

                //@ts-ignore
                let airstackfound=[];
                if(userData?.XMTPs.XMTP && userData?.XMTPs.XMTP) {
                      //@ts-ignore
                     airstackfound=userData?.XMTPs?.XMTP?.map(e=>e.owner.addresses[0]) || []
                }
                console.log( "airstackfound="+airstackfound)
                //@ts-ignore
        
        
                //BOOKMARK
                let notfromairstack = batch.filter(w=>!airstackfound.includes(w))
                console.log( "notfromairstack="+JSON.stringify(notfromairstack))

                let xanswers = await x_client.canMessage(notfromairstack);
                console.log("xanswers="+JSON.stringify(xanswers))
        
                let zipped =[];
                for (let s = 0; s < xanswers.length; s+=1) {
                  const curwallettest=notfromairstack[s];
                  zipped.push({pk:curwallettest,on_xmtp: xanswers[s]})
                  /*
                  let xanswer = await x_client.canMessage(curwallettest);
                  console.log("xanswer="+xanswer)
                  console.log("xanswer="+JSON.stringify(xanswer))
                  */
             
                      //@ts-ignore
                     const { error3 } = await supabase.from('people_search').update({ on_xmtp:  xanswers[s]}).eq('pk', curwallettest)
                    
                }

                       //@ts-ignore
                       const { data3, error } = await supabase.from("on_xmtp").upsert(zipped);
                       console.log("data3="+JSON.stringify(data3))
        

    }
  }
  return results;
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
