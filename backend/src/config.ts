import dotenv from 'dotenv'
import { createClient } from "@supabase/supabase-js";
import { Database } from "./__generated__/supabase-types.js";

dotenv.config()
type Config = {
    port: number | string,
    logLevel: string,
    talentLayerSubgraphUrl: string,
    databaseType: string,
    databaseUrl: string,
    rpcUrl: string,
    rpcNetwork: "mumbai" | "sepolia" | "goerli"
    easIssuerDid: string
    easIssuerAddress: string
}


if (!process.env.SUPABASE_PROJECT_ID || !process.env.SUPABASE_API_KEY) {
    throw new Error("Missing SUPABASE_PROJECT_ID or SUPABASE_API_KEY")
}

export const supabase = createClient<Database>(process.env.SUPABASE_PROJECT_ID, process.env.SUPABASE_API_KEY);


export const config: Config = {
    port: process.env.PORT || 3000,
    logLevel: (process.env.LOG_LEVEL || 'info').toLowerCase(),
    talentLayerSubgraphUrl: "https://api.thegraph.com/subgraphs/name/talentlayer/talentlayer-polygon",
    databaseType: (process.env.DATABASE_TYPE || "postgres"), //see README for one-liner to start postgres instance
    databaseUrl: (process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/postgres"),
    rpcUrl: (process.env.RPC_URL || "https://rpc-mumbai.maticvigil.com"),
    rpcNetwork: (process.env.RPC_NETWORK as "mumbai" | "sepolia" | "goerli" || "mumbai"),
    easIssuerDid: (process.env.CERAMIC_EAS_ISSUER_DID || "did:pkh:eip-155:11155111:0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F").toLowerCase(),
    easIssuerAddress: (process.env.CERAMIC_EAS_ISSUER_ADDRESS || "0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F").toLowerCase()
}

