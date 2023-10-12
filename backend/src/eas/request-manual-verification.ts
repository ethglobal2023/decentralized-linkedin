import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import { getBytes, hashMessage, recoverAddress } from "ethers";

const requestManualReviewSchema = Joi.object({
  message: Joi.object({
    account: Joi.string().required(),
    cid: Joi.string().required(),
    //Media type gives the reviewer a hint on what the content they'll be verifying is
    mediaType: Joi.string().valid("conference_talk", "publication", "interview")
  }).required(),
  signature: Joi.string().required(),
});

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const requestVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Attestation is verified in middleware before this function is called
  const { error: validationError, value } = requestManualReviewSchema.validate(
    req.body
  );
  if (validationError) {
    logger.error("Create manual verification request validation error:", validationError);
    return res.status(400).send(validationError.details[0].message);
  }

  const {message, signature} = value;

  const hash = hashMessage(JSON.stringify(message));  // Hash the message first
  const digest = getBytes(hash);  // Convert hash to binary array
  const recoveredAddress = recoverAddress(digest, signature);  // Rec
  if(!recoveredAddress === message.account){
    logger.warn(`Received signature from address that doesn't match the signature. 
    Got ${message.account} in the message but recovered ${recoveredAddress}`);
  }

  const { error } = await supabase
    .from("manual_review_inbox")
    .insert({
      account: message.account,
      cid: message.cid,
      media_type: message.mediaType,
      fulfilled: false,
    })

  const data = await supabase
    .from("manual_review_inbox")
    .select("*")
    .eq("account", message.account)
    .eq("cid", message.cid)
    .single()

  console.log("Successfully inserted new manual verification request", data);
  if (error) {
    logger.error("Failed to insert manual verification request:", error);
    return res
      .status(500)
      .json({ error: `Failed to insert manual verification request: ${error}` });
  }
  return res.status(200).send(data);
};
