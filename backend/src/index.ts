import express from 'express';
import winston from 'winston';
import morgan from 'morgan';
import cors from 'cors';
import {config} from "./config.js";
import {search} from "./search.js";
import {createNewAttestation} from "./eas/create.js";
import { requestVerification } from "./eas/request-manual-verification.js";
import { confirmVerification } from "./eas/confirm-manual-verification.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'))
app.use(cors({origin: '*'}));
let date = new Date().toISOString();
const logFormat = winston.format.printf(function(info) {
    return `${date}-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`;
});
export const logger = winston.createLogger({
    level: config.logLevel,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            level: config.logLevel,
            format: winston.format.combine(winston.format.colorize(), logFormat)
        })
    ]
})

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('combined'))
}


app.get('/search', search);
app.post("/eas/attest", createNewAttestation);
app.post("/eas/request-verification", requestVerification);
app.post("/eas/confirm-verification", confirmVerification);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// http://user-ui:password-ui@localhost:8088