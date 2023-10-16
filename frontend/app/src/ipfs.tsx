import { Resume } from "./types";


export const supabaseIPFSDownload = async (cid: string) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MDc3MTksImV4cCI6MjAxMjM4MzcxOX0.WiGeLc4r2OZhX_4bkIUeAOGjq-cXGmBN65i2qXfPnn4"
  );
  myHeaders.append(
    "apikey",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidW9lbnN2a29mc3R1aG5meHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMTIxMDksImV4cCI6MjAxMjg4ODEwOX0.d7WKH6x2tRcyh42ydu7GVI148PjoFS1BEOc4Adzo7dA"
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

  console.log(`fetching resume from supabase IPFS ${cid}`);
  const response2 = await fetch(
    "https://qbuoensvkofstuhnfxzn.supabase.co/rest/v1/rpc/ipfs",
    requestOptions
  );
  const txtDoc = await response2.text();
  console.log("fetched the following from Supabase IPFS", txtDoc);
  return txtDoc;
};

export const ipfsDownload = async (cid: string): Promise<Resume> => {
  const urlJoin = (...args: any[]) => {
    return args.join('/').replace(/\/+/g, '/');
  };
  if (!cid) throw new Error("No cid provided");
  console.log("Fetching resume from IPFS: ", cid);


  const cidWithPath = cid.endsWith("resume.json") ? cid :
    urlJoin(cid, "resume.json");

  const tryDownload = async (urlBase: string) => {
    try {
      const url = urlJoin(urlBase, cidWithPath);
      console.log(`Fetching resume from ${url}`);
      const resume = await fetch(url).then(res => res.json());
      return resume.text();
    } catch (error) {
      console.log(`Error fetching resume from ${urlBase}: `, error);
      return null;
    }
  };

  const resume = await supabaseIPFSDownload(cidWithPath)
    || await tryDownload("https://cloudflare-ipfs.com/ipfs")
    || await tryDownload("https://w3s.link/ipfs");

  if (!resume) throw new Error("Failed to download resume from all sources");

  return JSON.parse(JSON.parse(resume)[0].body);
};