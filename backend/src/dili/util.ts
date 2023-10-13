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

  const MAX_SCORE_CALC_AGE=30 ; //TODO move to config 

  export function dateDiffInDays(a:Date, b:Date) {  
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

export const rest_api_save_to_db= async(url:string, method:string, req_body:object={}, headers:object={Accept: 'application/json', "content-type":'application/json'}, callback:any =(response: any) => {}, max_age_days:number=30, ops?:string)=>{



    if(ops!="recalc"){
        const {data} = await supabase
        .from("rest_cache")
        .select("*")
        .eq("url",url)
        .eq("method",method)
        .eq("req_body",req_body)
        .single();
 
            if(data!==null&&data.updated_at!==null){
                let last=  new Date(Date.parse(data.updated_at));
                let today= new Date();
                console.log( dateDiffInDays(last,today))
                if( dateDiffInDays(last,today) <max_age_days  ){
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
        body:req_body
      };

      // @ts-ignore
     async function save_res_to_db(url,res){
        const {data} = await supabase
        .from("get_rest_cache")
        .upsert({url:url,method:method,req_body:req_body, response:res.response_body,status:res.status})
     }
      await axios.request(config).then((response) => {save_res_to_db(url,response); callback(response); return(response)}).catch((error) => {console.error(error);});
}


export const getWeb3BioNextId = async ( pk : string)=>{

    await rest_api_save_to_db("https://api.web3.bio/profile/"+pk,"get")

}


//For now this is only looking on optimism ,  but we should do all other chains 
export const getAllAttestations = async ( pk : string)=>{

    let getall_attestions_filter_receipiant_pk=JSON.parse(`'{"query":"query Query($where: AttestationWhereInput) {\n  attestations(where: $where) {\n    id\n    data\n    attester\n    decodedDataJson\n    expirationTime\n    ipfsHash\n    isOffchain\n    recipient\n    refUID\n    revocable\n    revocationTime\n    revoked\n    schemaId\n    time\n    timeCreated\n    txid\n  }\n}","variables":{"where":{"recipient":{"equals":"${pk}"}}}}'`);

    await rest_api_save_to_db("https://optimism.easscan.org/graphql","post",getall_attestions_filter_receipiant_pk)

}
