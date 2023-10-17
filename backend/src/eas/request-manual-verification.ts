import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import { MessageWithSignature } from "../signature-auth.js";

type RequestManualReviewMessage = {
  account: string;
  cid: string;
  mediaType: "conference_talk" | "publication" | "interview";
};
const requestManualReviewSchema = Joi.object<
  MessageWithSignature<RequestManualReviewMessage>
>({
  message: Joi.object({
    cid: Joi.string().required(),
    //Media type gives the reviewer a hint on what the content they'll be verifying is
    mediaType: Joi.string().valid(
      "conference_talk",
      "publication",
      "interview",
    ),
  }).required(),
});

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const requestVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Attestation is verified in middleware before this function is called
  const { error: validationError, value } = requestManualReviewSchema.validate(
    req.body,
    { allowUnknown: true },
  );
  if (validationError) {
    logger.error(
      "Create manual verification request validation error:",
      validationError,
    );
    return res.status(400).send(validationError.details[0].message);
  }

  const { message } = value;

  const { error } = await supabase.from("manual_review_inbox").insert({
    account: message.account,
    cid: message.cid,
    media_type: message.mediaType,
    status: "pending",
  });

  const data = await supabase
    .from("manual_review_inbox")
    .select("*")
    .eq("account", message.account)
    .eq("cid", message.cid)
    .single();

  console.log("Successfully inserted new manual verification request", data);
  if (error) {
    logger.error("Failed to insert manual verification request:", error);
    return res.status(500).json({
      error: `Failed to insert manual verification request: ${error}`,
    });
  }
  return res.status(200).send(data);
};
