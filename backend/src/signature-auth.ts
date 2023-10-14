import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { logger } from "./index.js";
import { getBytes, hashMessage, recoverAddress } from "ethers";
import { supabase } from "./config.js";

export type MessageWithSignature<T> = {
  message: T & { account: string };
  signature: string;
};
const signatureVerificationSchema = Joi.object<MessageWithSignature<any>>({
  message: Joi.object({}).required(),
  signature: Joi.string().required(),
});

const extractAddressFromMessage = (message: any, signature: string): string => {
  const hash = hashMessage(JSON.stringify(message)); // Hash the message first
  const digest = getBytes(hash); // Convert hash to binary array
  // Rec
  return recoverAddress(digest, signature);
};
export const signatureVerificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body)
  const { error: validationError, value } =
    signatureVerificationSchema.validate(req.body, {allowUnknown: true});

  if (validationError) {
    logger.error("Attestation request validation error:", validationError);
    return res.status(400).send(validationError.details[0].message);
  }

  const { message, signature } = req.body;
  const recoveredAddress = extractAddressFromMessage(message, signature);
  if (!recoveredAddress === message.account) {
    logger.warn(`Received signature from address that doesn't match the signature. 
    Got ${message.account} in the message but recovered ${recoveredAddress}`);
    return res.status(401).send("Signature doesn't match the message");
  }
  next();
};
