import express from "express";
import winston from "winston";
import morgan from "morgan";
import cors from "cors";
import { config } from "./config.js";
import { createNewAttestation } from "./eas/create-attestation.js";
import { requestVerification } from "./eas/request-manual-verification.js";
import { signatureVerificationMiddleware } from "./signature-auth.js";
import { calcTrustScore } from "./dili/calcTrustScore.js";
import { scrapeSocial } from "./dili/scrapeSocial.js";
import { checkXMTP } from "./dili/checkXMTP.js";
import { calcAllTrustScores } from "./dili/calcAllTrustScores.js";
import { announceConnectionRequest } from "./dili/announceConnectionRequest.js";
import { updateProfile } from "./profile/upsert-resume.js";
import { confirmVerification } from "./eas/confirm-manual-verification.js";
import { getResume } from "./profile/get-resume.js";
import { getAttestationsForAddress } from "./eas/get-attestations.js";
import { verifyAttestations } from "./eas/verify.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors({ origin: "*" }));
let date = new Date().toISOString();

const logFormat = winston.format.printf(function (info) {
  return `${date}-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`;
});

export const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: config.logLevel,
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("combined"));
}

app.get("/api/profile", getResume);
app.get("/api/attestations", getAttestationsForAddress);
app.post("/api/eas/verify", signatureVerificationMiddleware, verifyAttestations);
app.post("/api/eas/attest", signatureVerificationMiddleware, createNewAttestation); //Signature verification is handled w/ EAS here, not in middleware
app.post(
  "/api/eas/request-verification",
  signatureVerificationMiddleware,
  requestVerification
);
app.post(
  "/api/eas/confirm-verification",
  signatureVerificationMiddleware,
  confirmVerification
);
app.post("/api/profile", signatureVerificationMiddleware, updateProfile);
app.post("/api/dili/trustscore", calcTrustScore);
app.post("/api/dili/scrapesocial", scrapeSocial);
app.post("/api/dili/checkxmtp", checkXMTP);
app.post("/api/dili/calcalltrustscores", calcAllTrustScores);
app.post("/api/dili/announceconnectionrequest", announceConnectionRequest);




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app