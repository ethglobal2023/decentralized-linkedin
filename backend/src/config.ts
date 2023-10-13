import dotenv from 'dotenv'
import { createClient } from "@supabase/supabase-js";
import { Database } from "./__generated__/supabase-types.js";
import { Web3Storage } from "web3.storage";

dotenv.config()
type Config = {
    port: number | string,
    logLevel: string,
    talentLayerSubgraphUrl: string,
    databaseType: string,
    databaseUrl: string,
    rpcUrl: string,
    rpcNetwork: "mumbai" | "sepolia" | "goerli",
}

if (!process.env.SUPABASE_PROJECT_ID || !process.env.SUPABASE_API_KEY) {
    throw new Error("Missing SUPABASE_PROJECT_ID or SUPABASE_API_KEY")
}
if (!process.env.WEB3_STORAGE_KEY) {
    throw new Error("Missing WEB3_STORAGE_KEY")
}

export const supabase = createClient<Database>(process.env.SUPABASE_PROJECT_ID, process.env.SUPABASE_API_KEY);

export const web3StorageClient = new Web3Storage({ token: process.env.WEB3_STORAGE_KEY })

export const config: Config = {
    port: process.env.PORT || 3000,
    logLevel: (process.env.LOG_LEVEL || 'info').toLowerCase(),
    talentLayerSubgraphUrl: "https://api.thegraph.com/subgraphs/name/talentlayer/talentlayer-polygon",
    databaseType: (process.env.DATABASE_TYPE || "postgres"), //see README for one-liner to start postgres instance
    databaseUrl: (process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/postgres"),
    rpcUrl: (process.env.RPC_URL || "https://rpc-mumbai.maticvigil.com"),
    rpcNetwork: (process.env.RPC_NETWORK as "mumbai" | "sepolia" | "goerli" || "mumbai"),
}

