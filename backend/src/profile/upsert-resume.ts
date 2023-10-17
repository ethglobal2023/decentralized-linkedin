import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { supabase, web3StorageClient } from "../config.js";
import { MessageWithSignature } from "../signature-auth.js";
import { logger } from "../index.js";
// @ts-ignore
import { Blob, File } from "web3.storage";

type UpdateMessage = {
  account: string;
  resume: string;
};

const updateSchema = Joi.object<MessageWithSignature<UpdateMessage>>({
  message: Joi.object({
    account: Joi.string().required(),
    resume: Joi.string().required(),
  }),
});

const uploadToInternalIPFS = async (fileBody: string) => {
  const blob = new Blob([fileBody], {
    type: "application/json",
  });

  const files = [new File([blob], "resume.json")];
  const cid = await web3StorageClient.put(files, {
    onStoredChunk: (bytes: any) =>
      logger.info(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
  });
  console.log("getting cid", cid);

  const resx = await web3StorageClient.get(cid);
  console.log("getting resx", resx);
  const filesx = await resx.files();
  const uploadedFileUrls = [];
  for (const file of filesx) {
    console.log(`File Info: ${file.cid} ${file.name} ${file.size}`);
  }

  logger.info(`🔗 Content added to IPFS with CID: ${cid}`);
  logger.info(`🔗 https://dweb.link/ipfs/${cid}/resume.json`);
  return `${cid}/resume.json`;
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error: validationError, value } = updateSchema.validate(req.body, {
    allowUnknown: true,
  });

  const { account, resume } = value.message;

  try {
    const ourCid = await uploadToInternalIPFS(resume);

    //TODO recalculate trust score
    const { error } = await supabase
      .from("resumes")
      .upsert({ address: account, cid: ourCid })
      .eq("account", account);

    if (error) {
      logger.error("Failed to update resume:", error);
      return res.status(500).json({
        error: `Failed to update resume: ${error}`,
      });
    }

    // const allKeywords: string[] = []
    // Search for all keys containing "keywords" in resume

    return res.status(200).json({ cid: ourCid });
  } catch (e) {
    logger.error("Failed to update resume:", e);
    return res.status(500).json({
      error: `Failed to update resume: ${e}`,
    });
  }
};
