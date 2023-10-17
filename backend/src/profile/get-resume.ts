import Joi from "joi";
import { logger } from "../index.js";
import { Response, Request, NextFunction } from "express";

const schema = Joi.object({
  cid: Joi.string().required(),
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
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDc3MTksImV4cCI6MjAxMjM4MzcxOX0.WiGeLc4r2OZhX_4bkIUeAOGjq-cXGmBN65i2qXfPnn4",
  );
  myHeaders.append(
    "apikey",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDc3MTksImV4cCI6MjAxMjM4MzcxOX0.WiGeLc4r2OZhX_4bkIUeAOGjq-cXGmBN65i2qXfPnn4",
  );
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    _cid: cid,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  logger.debug(`fetching resume from supabase IPFS ${cid}`);
  const response2 = await fetch(
    "https://qbuoensvkofstuhnfxzn.supabase.co/rest/v1/rpc/ipfs",
    requestOptions,
  );
  const txtDoc = await response2.text();
  logger.debug("fetched the following from Supabase IPFS", txtDoc);
  return txtDoc;
};

export const getResume = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error: validationError, value } = schema.validate(req.body, {
    allowUnknown: true,
  });
  const { cid } = value;

  if (cid.split("/").length < 2 || cid.split(".").length < 2) {
    console.error("REMEMBER to include the file at the end of the CID  " + cid);
    return res
      .status(400)
      .send("The provided CID does not specify a path to the underlying file");
  }

  try {
    const fileBody = await cloudflareIPFSDownload(cid);
    return res.status(200).send(fileBody);
  } catch (e) {
    logger.error("Failed to download resume from CloudFlare IPFS:", e);
  }

  try {
    const fileBody = await supabaseIPFSDownload(cid);
    return res.status(200).send(fileBody);
  } catch (e) {
    logger.error("Failed to download resume from CloudFlare IPFS:", e);
    return res.status(500).json({ error: e });
  }
};
