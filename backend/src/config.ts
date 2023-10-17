import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./__generated__/supabase-types.js";
// @ts-ignore
import { Web3Storage } from "web3.storage";
import * as ethers from "ethers";
import * as xmtp from "@xmtp/xmtp-js";

dotenv.config();
type Config = {
  port: number | string;
  logLevel: string;
};

if (!process.env.SUPABASE_PROJECT_ID || !process.env.SUPABASE_API_KEY) {
  throw new Error("Missing SUPABASE_PROJECT_ID or SUPABASE_API_KEY");
}
if (!process.env.WEB3_STORAGE_KEY) {
  throw new Error("Missing WEB3_STORAGE_KEY");
}

export const supabase = createClient<Database>(
  process.env.SUPABASE_PROJECT_ID,
  process.env.SUPABASE_API_KEY,
);

export const web3StorageClient = new Web3Storage({
  token: process.env.WEB3_STORAGE_KEY,
});

export const XMTP_UTIL =
  process.env.XMTP_UTIL ||
  "0xd68f09af7c08401aba79ace4012de6f70aa7056bb8d6243ee4213f1522be4b45";

const x_accountmanager = new ethers.Wallet(XMTP_UTIL);
export const x_client = await xmtp.Client.create(x_accountmanager);

export const config: Config = {
  port: process.env.PORT || 3000,
  logLevel: (process.env.LOG_LEVEL || "info").toLowerCase(),
};
