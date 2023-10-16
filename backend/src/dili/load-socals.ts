import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import {
  dateDiffInDays,
  getWeb3BioNextId,
  crawlEAS,
} from "./util.js";
import { filterUserAssets } from "./user-balance.js";
import { getAllAttestations } from "lib/dist/getAllAttestations.js";

const schemaCheck = Joi.object({
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
 


  let tmp = await crawlEAS();

  1==1
  return res.status(200).send({ tmp:tmp });
};
