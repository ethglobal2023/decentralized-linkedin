import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import {
  dateDiffInDays,
  getWeb3BioNextId,
  crawlEAS,
  airStackFarCaster,
  queryWallets,
} from "./util.js";
import { filterUserAssets } from "./user-balance.js";
//import { getAllAttestations } from "lib/dist/getAllAttestations.js";

import { signatureVerificationMiddleware } from "../signature-auth.js";

import { getBytes, hashMessage, recoverAddress } from "ethers";
import * as ethers from "ethers"; 
import { calcTrustScore,internalcalcTrustScore } from "./calcTrustScore.js";


const schemaCheck = Joi.object({
  from: Joi.string().required(),
  request_hash: Joi.string().required(),
  from_signature: Joi.string().required(),
});
 

 

//TODO this should return immediatly and start a background worker thread, release the main thread. 
// Collects metadata about the uploaded media and adds it to the manual review inbox
export const announceConnectionRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("announceConnectionRequest() + req.body=", req.body);


  try{
    const recoveredAddress = await ethers.verifyMessage(req.body.request_hash, req.body.from_signature);
    console.log("inside announceConnectionRequest()  ethers.verifyMessage() returned "+recoveredAddress)
  //const recoveredAddress = recoverAddress(req.body.request_hash, req.body.from_signature);
    if (recoveredAddress === req.body.from) {
        console.log("announceConnectionRequest found correct address in signature")
        try{
            //@ts-ignore
            const {data, error } =  await supabase.from('connection_requests').upsert({from:req.body.from,request_hash:req.body.request_hash,from_signature:req.body.from_signature});
            
            
            let today = new Date();
            let priorDate = new Date(new Date().setDate(today.getDate() - 30))

            const result3  = await supabase.from('connection_requests').select('*', { count: 'exact', head: true }).eq('from',req.body.from).gt('created_at', priorDate.toISOString());

            1===1;
            return res.status(200).send({ status:200 , numConnectionRequestsLast30Days:result3.count });
    }
    catch(error){
        logger.warn(`error in upsert on connection_requests table announceConnectionRequest.ts `+error)
        return res.status(401).send(`error in upsert on connection_requests table announceConnectionRequest.ts `+error);

    }

    }
    else{
        console.log("announceConnectionRequest found WRONG address in signature")
        logger.warn(`Received signature from address that doesn't match the signature. 
    Got ${req.body.from} in the message but recovered ${recoveredAddress}`);
    return res.status(401).send("Signature doesn't match the message");

    
    }

  }
  catch(error){
    logger.warn(`Something was wrong with the Signature string extractAddressFromMessage in announceConnectionRequest() `+error);
    return res.status(401).send("Something was wrong with the Signature string");
  }

 
   // return res.status(200).send({ status:200 });
}
