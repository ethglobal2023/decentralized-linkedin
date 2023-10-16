import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import {
  dateDiffInDays,
  getWeb3BioNextId,
  crawlEAS,
  airStackFarCaster,
} from "./util.js";
import { filterUserAssets } from "./user-balance.js";
import { getAllAttestations } from "lib/dist/getAllAttestations.js";

const schemaCheck = Joi.object({
  ops: Joi.string().optional(),
});

const MAX_SCORE_CALC_AGE = 30;

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const scrapeSocial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("Start trust score calc:", req.body);

 console.log("starting airstack scrape")
 await airStackFarCaster();


 console.log("starting eas scrape")
  let all_eas_recipiants_optimism = await crawlEAS();

  for (let i = 0; i < all_eas_recipiants_optimism.length; i++) {
    let curpk=all_eas_recipiants_optimism[i].recipient;
    console.log("eas recipient "+i);
  }
  

  1==1
  return res.status(200).send({ status:200 });
};
