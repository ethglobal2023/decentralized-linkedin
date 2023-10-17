import { logger } from "../index.js";

export const supabaseIPFSDownload = async (cid: string) => {
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
