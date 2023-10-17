import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import { supabase } from "../config.js";

import { internalcalcTrustScore } from "./calcTrustScore.js";

//TODO this should return immediatly and start a background worker thread, release the main thread.
// Collects metadata about the uploaded media and adds it to the manual review inbox
export const calcAllTrustScores = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("calc all scores:", req.body);

  const { data } = await supabase
    .from("people_without_trust_score")
    .select("*");

  if (data) {
    console.log(
      " in calcAllTrustScores() people_search data " +
        JSON.stringify(data.slice(0, 50)),
    );

    for (let s = 0; s < data.length; s += 1) {
      const row = data[s];
      //@ts-ignore
      //@ts-ignore
      const resi = await internalcalcTrustScore(row.pk);
      console.log(
        "    internalcalcTrustScore() resi :   " + JSON.stringify(resi),
      );

      1 == 1;
    }
  }
  return res.status(200).send({ status: 200 });
};
