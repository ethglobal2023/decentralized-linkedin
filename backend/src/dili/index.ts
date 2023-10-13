import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import {dateDiffInDays , getWeb3BioNextId, getAllAttestations} from "./util.js"

const schemaCheck = Joi.object({
  account: Joi.string().required(), 
  ops:Joi.string().optional(),
});

const MAX_SCORE_CALC_AGE=30;





// Collects metadata about the uploaded media and adds it to the manual review inbox
export const calcTrustScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("Start trust score calc:", req.body);


  const { error: validationError, value } = schemaCheck.validate(
    req.body 
  );
  if (validationError) {
    logger.error("Attestation request validation error:", validationError);
    return res.status(400).send(validationError.details[0].message);
  }

//  console.log("why ");
//  console.log("why ");
  // TODO Add signature verification here to make sure a rando is not spamming us. 
1===1;
console.log(req.body  && req.body.ops!=='recalc');
  if(req.body  && req.body.ops!=='recalc' ){
    const { data, error } = await supabase
    .from("user_trust_score")
    .select("*")
    .eq("pk",req.body.account).limit(1).single()
    if(data!==null&&data.updated_at!==null){
            let last=  new Date(Date.parse(data.updated_at));
            let today= new Date();
            console.log( dateDiffInDays(last,today))
            if( dateDiffInDays(last,today) < MAX_SCORE_CALC_AGE ){
                return res.status(200).send(data); 
            } 

    }
  } 

  // Check in DB if they have  gitcoin passport 
    // Check in DB if not there then check in EAS graphQL
  // check if they have talent layer reviews (which right now nobody does)
  // check if they have our attestations 
   
  // get domains from next.id 
 

const res1= await getWeb3BioNextId(req.body.account);  
const res2= await getAllAttestations(req.body.account);
  /*
  const { data } = await supabase
  .from("attestations")
  .select("*");
  */
 1===1;

//AirStack is so hard to get a clean answer out of 


    const ll = await supabase
    .from("attester_a_priori_trust_coef")
    .select("*");

    ll.data

  console.log("Approved request for ",  ll.data);
 
  return res.status(200).send({data:"HELLO WORLD"});
};
