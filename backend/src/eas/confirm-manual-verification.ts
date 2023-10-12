import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";

const requestManualReviewSchema = Joi.object({
  account: Joi.string().required(), //TODO Account won't be required when a signature is included
  cid: Joi.string().required(),
  signature: Joi.object({
    r: Joi.string().optional(),
    s: Joi.string().optional(),
    v: Joi.number().optional(),
  }).optional(), //TODO stubbed here as optional. Should be made required later.
});

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const confirmVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("Attestation request:", req.body);
  logger.debug("Creating new attestation");

  const { error: validationError, value } = requestManualReviewSchema.validate(
    req.body
  );
  if (validationError) {
    logger.error("Attestation request validation error:", validationError);
    return res.status(400).send(validationError.details[0].message);
  }

  // TODO Add signature verification here

  const { error } = await supabase
    .from("manual_review_inbox")
    .update({
      fulfilled: true,
    })
    .eq("account", value.account)
    .eq("cid", value.cid)

  const data = await supabase
    .from("manual_review_inbox")
    .select("*")
    .eq("account", value.account)
    .eq("cid", value.cid)
    .single()


  console.log("Approved request for ", data);
  if (error) {
    logger.error("Failed to mark verification request as fulfilled:", error);
    return res
      .status(500)
      .json({ error: `Failed to mark verification request as fulfilled: ${error}` });
  }
  return res.status(200).send(data);
};
