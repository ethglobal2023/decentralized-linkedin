import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import {
  dateDiffInDays,
  getWeb3BioNextId,
  getAllAttestations,
} from "./util.js";
import { filterUserAssets } from "./user-balance.js";

const schemaCheck = Joi.object({
  account: Joi.string().optional(),
  ops: Joi.string().optional(),
});

const MAX_SCORE_CALC_AGE = 30;

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const calcTrustScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("Start trust score calc:", req.body);

  const { error: validationError, value } = schemaCheck.validate(req.body);
  if (validationError) {
    logger.error("Attestation request validation error:", validationError);
    return res.status(400).send(validationError.details[0].message);
  }

  //  console.log("why ");
  //  console.log("why ");
  // TODO Add signature verification here to make sure a rando is not spamming us.
  1 === 1;
  console.log(req.body && req.body.ops !== "recalc");
  if (req.body && req.body.ops !== "recalc") {
    const { data, error } = await supabase
      .from("user_trust_score")
      .select("*")
      .eq("pk", req.body.account)
      .limit(1)
      .single();
    if (data !== null && data.updated_at !== null) {
      let last = new Date(Date.parse(data.updated_at));
      let today = new Date();
      console.log(dateDiffInDays(last, today));
      if (dateDiffInDays(last, today) < MAX_SCORE_CALC_AGE) {
        return res.status(200).send(data);
      }
    }
  }

  // Check in DB if they have  gitcoin passport
  // Check in DB if not there then check in EAS graphQL
  // check if they have talent layer reviews (which right now nobody does)
  // check if they have our attestations

  // get domains from next.id

  let  calcScore=0;
  const res1= await getWeb3BioNextId(req.body.account);
  if(res1 && res1.length>0){
    calcScore=calcScore+1;
  }

  const res2 = await getAllAttestations(req.body.account);
  if(res2 && res2.length>0){
    calcScore=calcScore+1;
  //@ts-ignore
    const { data: attester_a_priori_trust_coef, error } = await supabase.from("attester_a_priori_trust_coef").select("*");
    if(attester_a_priori_trust_coef){
      //@ts-ignore
      const a_priori_approved_attestations = res2.map( (a)=> {
              //@ts-ignore
          return {...attester_a_priori_trust_coef.find((aa)=>aa.pk===a.attester)};
      })
         //@ts-ignore
      const extra_score_from_best_attestation = Math.max(...a_priori_approved_attestations.map((e)=>e.coef).filter((a)=>a!==undefined))  ;
      calcScore+=extra_score_from_best_attestation
      1==1;
    }
  }




  //   console.log("🚀 ~ file: calcTrustScore.ts:67 ~ res2:", res2);

  const gitcoinCheck = checkGitcoinAttestation(res2);
  if(gitcoinCheck){
    calcScore+=gitcoinCheck
  }
  console.log("🚀 ~ file: calcTrustScore.ts:70 ~ gitcoinCheck:", gitcoinCheck);

  const res3 = await getBalancePoints(req.body.account)
  if(res3){
    calcScore=calcScore+1;
  }
  

  let result_payload={pk:req.body.account,score:calcScore,updated_at:(new Date().toISOString())};
  try {
   await supabase.from("user_trust_score").upsert(result_payload);
  }catch(errorUpsert){
    console.error("error in calcTrustScore errorUpsert: "+errorUpsert);

  }

  return res.status(200).send({ result_payload});
};

const checkGitcoinAttestation = (data: any) => {
  //console.log("gitcoindata", data.length);

  let filteredAttestations: any[] = [];
  if (data.length > 0) {
    filteredAttestations = data.filter((attestation: any) => {
      //console.log("attester960,", attestation.attester);

      if (
        attestation.attester === "0x843829986e895facd330486a61Ebee9E1f1adB1a"//hardcoded gitcoin passport wallet 
      ) {
        return true;
      }
    });
  }
  if (filteredAttestations.length > 0) {
    const gitcoinAttestationData = filteredAttestations.map((attestation) => {
      //console.log("atte103", JSON.parse(attestation.decodedDataJson));
      const parsedData = JSON.parse(attestation.decodedDataJson);
      return parsedData;
    });

     

    const userScoreS = gitcoinAttestationData.map((attestation: any) => {
     // console.log("attestatio112n", attestation);
      //@ts-ignore
      let scoreval= parseInt(attestation.find((e)=>e.name==="score")?.value?.value?.hex||0,16) 
      //@ts-ignore
      let scoredec= attestation.find((e)=>e.name==="score_decimals")?.value?.value || 18
      let finalscore = scoreval/(Math.pow(10,scoredec))
        return finalscore
    });
    
    return Math.max(...userScoreS)
  } else {
    return 0;
  }
};

const getBalancePoints = async (pk:string) => {
  const balance = await filterUserAssets(pk);
  if (balance.length > 0) {
    return 1;
  } else {
    return 0;
  }
};
// const result = await calcTrustScore(req);
// console.log("🚀 ~ file: calcTrustScore.ts:96 ~ result:", result);
