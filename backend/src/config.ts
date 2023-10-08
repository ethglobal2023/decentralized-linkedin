import dotenv from 'dotenv'

dotenv.config()
type Config = {
    port: number | string,
    logLevel: string,
    talentLayerSubgraphUrl: string,
    databaseType: string,
    databaseUrl: string,
    rpcUrl: string,
    rpcNetwork: "mumbai" | "sepolia" | "goerli"
    ceramicKey: string
    ceramicUrl: string
    ceramicIssuerDid: string
    ceramicIssuerAddress: string
}
export const config: Config = {
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    talentLayerSubgraphUrl: "https://api.thegraph.com/subgraphs/name/talentlayer/talentlayer-polygon",
    databaseType: process.env.DATABASE_TYPE || "postgres", //see README for one-liner to start postgres instance
    databaseUrl: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/postgres",
    rpcUrl: process.env.RPC_URL || "https://rpc-mumbai.maticvigil.com",
    rpcNetwork: process.env.RPC_NETWORK as "mumbai" | "sepolia" | "goerli" || "mumbai",
    ceramicKey: process.env.CERAMIC_KEY || "",
    ceramicUrl: process.env.CERAMIC_URL || "http://localhost:7007",
    ceramicIssuerDid: process.env.CERAMIC_EAS_ISSUER_DID || "did:pkh:eip-155:11155111:0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F",
    ceramicIssuerAddress: process.env.CERAMIC_EAS_ISSUER_ADDRESS || "0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F"
}


console.log(config)