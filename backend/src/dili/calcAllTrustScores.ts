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
import { getAllAttestations } from "lib/dist/getAllAttestations.js";

 

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const calcAllTrustScores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("calc all scores:", req.body);
  

  1==1
  return res.status(200).send({ status:200 });
};
