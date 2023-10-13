import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { supabase, web3StorageClient } from "../config.js";
import { MessageWithSignature } from "../signature-auth.js";
import { logger } from "../index.js";

type UpdateMessage = {
  account: string;
  cid: string;
};

const updateSchema = Joi.object<MessageWithSignature<UpdateMessage>>({
  message: Joi.object({
    account: Joi.string().required(),
    cid: Joi.string().required(),
  }),
});

const cloudflareIPFSDownload = async (cid: string) => {
  const dllink = `https://cloudflare-ipfs.com/ipfs/${cid}`;
  logger.debug(`Fetching resume from CloudFlare IPFS ${dllink}`);
  const response = await fetch(dllink);
  const txtdoc = await response.text();
  logger.debug("Fetched the following from CloudFlare IPFS");
  return txtdoc;
};

const supabaseIPFSDownload = async (cid: string) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDc3MTksImV4cCI6MjAxMjM4MzcxOX0.WiGeLc4r2OZhX_4bkIUeAOGjq-cXGmBN65i2qXfPnn4"
  );
  myHeaders.append(
    "apikey",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDc3MTksImV4cCI6MjAxMjM4MzcxOX0.WiGeLc4r2OZhX_4bkIUeAOGjq-cXGmBN65i2qXfPnn4"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    _cid: cid,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  logger.debug(`fetching resume from supabase IPFS ${cid}`);
  const response2 = await fetch(
    "https://qbuoensvkofstuhnfxzn.supabase.co/rest/v1/rpc/ipfs",
    requestOptions
  );
  const txtDoc = await response2.text();
  logger.debug("fetched the following from Supabase IPFS", txtDoc);
  return txtDoc;
};

const uploadToInternalIPFS = async (expectedCid: string, fileBody: string) => {
  const cid = await web3StorageClient.put(fileBody, {
    onStoredChunk: (bytes: any) =>
      logger.info(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
  });
  if (cid != expectedCid) {
    throw new Error(
      `CID mismatch when uploading to our IPFS instance. Expected ${expectedCid} but got ${cid}`
    );
  }
  logger.info(`🔗 Content added to IPFS with CID: ${cid}`)
  logger.info(`🔗 https://dweb.link/ipfs/${cid} (<- Double check this has filepath`)
  return cid;
  // showLink(`https://dweb.link/ipfs/${cid}/${last_fname_uploaded}`);
};

export const updatePolicy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error: validationError, value } = updateSchema.validate(req.body, {
    allowUnknown: true,
  });

  const { account, cid } = value.message;

  if (cid.split("/").length < 2 || cid.split(".").length < 2) {
    console.error(
      "REMEMBER to include the file at the end of the CID  " + cid
    );
    return res
      .status(400)
      .send("The provided CID does not specify a path to the underlying file");
  }

  try {
    const fileBody = await cloudflareIPFSDownload(cid);
    const ourCid = await uploadToInternalIPFS(cid, fileBody);

    const existingResume = await supabase
      .from("people_search")
      .select("json")
      .eq("account", account)
      .single();

    //TODO recalculate trust score
    const { error } = await supabase
      .from("people_search")
      .update({ text: fileBody, json: fileBody })
      .eq("account", account);

    if (error) {
      logger.error("Failed to update resume:", error);
      return res.status(500).json({
        error: `Failed to update resume: ${error}`,
      });
    }
    return res.status(200);

  } catch (e) {
    logger.error("Failed to update resume:", e);
    return res.status(500).json({
      error: `Failed to update resume: ${e}`,
    });
  }

};
