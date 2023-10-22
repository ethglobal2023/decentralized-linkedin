import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import { MessageWithSignature } from "../signature-auth.js";


type ConfirmManualVerificationMessage = {
  cid: string;
  accept: boolean;
  account: string;
}

const confirmSchema = Joi.object<MessageWithSignature<ConfirmManualVerificationMessage>>({
  message: {
    cid: Joi.string().required(),
    accept: Joi.boolean().required(),
    account: Joi.string().optional(),
  },

});

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const confirmVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("Confirming manual review:", req.body);

  const { error: validationError, value } = confirmSchema.validate(
    req.body, {allowUnknown: true}
  );
  if (validationError) {
    logger.error("Attestation request validation error:", validationError);
    return res.status(400).send(validationError.details[0].message);
  }

  const { message } = value;

  const { error } = await supabase
    .from("manual_review_inbox")
    .update({
      status: message.accept ? "accepted" : "rejected",
    })
    .eq("account", message.account)
    .eq("cid", message.cid)

  const data = await supabase
    .from("manual_review_inbox")
    .select("*")
    .eq("account", message.account)
    .eq("cid", message.cid)
    .single()

  console.log("Confirmed manual ", data);
  if (error) {
    logger.error("Failed to mark verification request as fulfilled:", error);
    return res
      .status(500)
      .json({ error: `Failed to mark verification request as fulfilled: ${error}` });
  }
  return res.status(200).send(data);
};
