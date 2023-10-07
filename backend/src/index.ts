import express from 'express';
import winston from 'winston';
import morgan from 'morgan';
import {search} from "./search";
import listIdentifiers from "./credentials/list-identifiers";
import createIdentifier from "./credentials/create-identifier";
import getCredentials from "./credentials/get-credentials";
import createCredentials from "./credentials/create-credentials";
import verifyCredentials from "./credentials/verify-credentials";

type Config = {
    port: number | string,
    logLevel: string,
    talentLayerSubgraphUrl: string,
    databaseType: string,
    databaseUrl: string,
    rpcUrl: string,
    rpcNetwork: "mumbai" | "sepolia" | "goerli"
}

export const config: Config = {
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    talentLayerSubgraphUrl: "https://api.thegraph.com/subgraphs/name/talentlayer/talentlayer-polygon",
    databaseType: process.env.DATABASE_TYPE || "postgres", //see README for one-liner to start postgres instance
    databaseUrl: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/postgres",
    rpcUrl: process.env.RPC_URL || "https://rpc-mumbai.maticvigil.com",
    rpcNetwork: process.env.RPC_NETWORK as "mumbai" | "sepolia" | "goerli" || "mumbai"
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))

export const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.json(),
})

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('combined'))
}


app.get('/search', search);

app.get("/identifiers", listIdentifiers);
app.post("/identifiers", createIdentifier);
app.get("/credentials/", getCredentials);
app.post("/credentials/", createCredentials);
app.post("/credentials/verify", verifyCredentials);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;

// http://user-ui:password-ui@localhost:8088