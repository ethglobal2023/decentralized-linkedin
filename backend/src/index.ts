import express, {NextFunction, Request, Response} from 'express';
import winston from 'winston';
import morgan from 'morgan';
import {search} from "./search";
import axios from "axios/index";
import {processGraphqlRequest} from "./lib";

export const config = {
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    // talentLayerSubgraphUrl: process.env.TALENTLAYER_SUBGRAPH_URL || "https://api.thegraph.com/subgraphs/name/talentlayer/talent-layer-mumbai/graphql"
    talentLayerSubgraphUrl: process.env.TALENTLAYER_SUBGRAPH_URL || "https://api.thegraph.com/subgraphs/name/talentlayer/talentlayer-polygon"
}
const app = express();
const PORT = process.env.PORT || 3000;

type SearchOutput = {
    name: string;
    website: string; // url
    skills: string[];
    source: "talentlayer";
}

app.use(express.urlencoded({ extended: false }))
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



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;

// http://user-ui:password-ui@localhost:8088