import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import { dateDiffInDays, getWeb3BioNextId } from "./util.js";
import { filterUserAssets } from "./user-balance.js";

import { getAllAttestations } from "lib";

const schemaCheck = Joi.object({
  account: Joi.string().optional(),
  ops: Joi.string().optional(),
});

const MAX_SCORE_CALC_AGE = 30;

export const internalcalcTrustScore = async (account: string, ops: string) => {
  console.log(account && ops !== "recalc");
  if (account && ops !== "recalc") {
    const { data, error } = await supabase
      .from("user_trust_score")
      .select("*")
      .eq("pk", account)
      .limit(1)
      .single();
    if (data !== null && data.updated_at !== null) {
      const last = new Date(Date.parse(data.updated_at));
      const today = new Date();
      console.log(dateDiffInDays(last, today));
      if (dateDiffInDays(last, today) < MAX_SCORE_CALC_AGE) {
        return data;
      }
    }
  }

  // Check in DB if they have  gitcoin passport
  // Check in DB if not there then check in EAS graphQL
  // check if they have talent layer reviews (which right now nobody does)
  // check if they have our attestations

  // get domains from next.id

  let calcScore = 0;
  const res1 = await getWeb3BioNextId(account);
  if (res1 && res1.length > 0) {
    calcScore = calcScore + 1;
  }

  const res2 = await getAllAttestations(supabase, account);
  if (res2 && res2.length > 0) {
    calcScore = calcScore + 1;
    //@ts-ignore
    const { data: attester_a_priori_trust_coef, error } = await supabase
      .from("attester_a_priori_trust_coef")
      .select("*");
    if (attester_a_priori_trust_coef) {
      //@ts-ignore
      const a_priori_approved_attestations = res2.map((a) => {
        //@ts-ignore
        return {
          ...attester_a_priori_trust_coef.find((aa) => aa.pk === a.attester),
        };
      });
      //@ts-ignore
      const extra_score_from_best_attestation = Math.max(
        ...a_priori_approved_attestations
          .map((e) => e.coef || 0)
          .filter((a) => a !== undefined),
      );
      calcScore += extra_score_from_best_attestation;
      1 == 1;
    }
  }

  //   console.log("🚀 ~ file: calcTrustScore.ts:67 ~ res2:", res2);

  const gitcoinCheck = checkGitcoinAttestation(res2);
  if (gitcoinCheck) {
    calcScore += gitcoinCheck;
  }
  console.log("🚀 ~ file: calcTrustScore.ts:70 ~ gitcoinCheck:", gitcoinCheck);

  const res3 = await getBalancePoints(account);
  if (res3) {
    calcScore = calcScore + 1;
  }

  const result_payload = {
    pk: account,
    score: calcScore,
    updated_at: new Date().toISOString(),
  };

  try {
    await supabase.from("user_trust_score").upsert(result_payload);
  } catch (errorUpsert) {
    console.error("error in calcTrustScore errorUpsert: " + errorUpsert);
  }

  try {
    await supabase
      .from("people_search")
      .update({ trust_score: calcScore })
      .eq("pk", account);
  } catch (uper) {
    console.error("error updating people_search column trust_score : " + uper);
  }

  return result_payload;
};

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const calcTrustScore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("Start trust score calc:", req.body);

  const { error: validationError, value } = schemaCheck.validate(req.body);
  if (validationError) {
    logger.error("Attestation request validation error:", validationError);
    return res.status(400).send(validationError.details[0].message);
  }

  // TODO Add signature verification here to make sure a rando is not spamming us.

  const result_payload = await internalcalcTrustScore(
    req.body.account,
    req.body.ops,
  );

  return res.status(200).send({ result_payload });
};

const checkGitcoinAttestation = (data: any) => {
  //console.log("gitcoindata", data.length);

  let filteredAttestations: any[] = [];
  if (data.length > 0) {
    filteredAttestations = data.filter((attestation: any) => {
      //console.log("attester960,", attestation.attester);

      if (
        attestation.attester === "0x843829986e895facd330486a61Ebee9E1f1adB1a" //hardcoded gitcoin passport wallet
      ) {
        return true;
      }
    });
  }
  if (filteredAttestations.length > 0) {
    const gitcoinAttestationData = filteredAttestations.map((attestation) => {
      //console.log("atte103", JSON.parse(attestation.decodedDataJson));
      const parsedData = JSON.parse(attestation.decodedDataJson);
      return parsedData;
    });

    const userScoreS = gitcoinAttestationData.map((attestation: any) => {
      // console.log("attestatio112n", attestation);
      //@ts-ignore
      const scoreval = parseInt(
        attestation.find((e: any) => e.name === "score")?.value?.value?.hex ||
          0,
        16,
      );
      //@ts-ignore
      const scoredec =
        attestation.find((e: any) => e.name === "score_decimals")?.value
          ?.value || 18;
      const finalscore = scoreval / Math.pow(10, scoredec);
      return finalscore;
    });

    return Math.max(...userScoreS);
  } else {
    return 0;
  }
};

const getBalancePoints = async (pk: string) => {
  const balance = await filterUserAssets(pk);
  if (balance.length > 0) {
    return 1;
  } else {
    return 0;
  }
};
// const result = await calcTrustScore(req);
// console.log("🚀 ~ file: calcTrustScore.ts:96 ~ result:", result);
