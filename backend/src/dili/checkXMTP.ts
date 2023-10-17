import { NextFunction, Request, Response } from "express";
import { logger } from "../index.js";
import Joi from "joi";
import { supabase } from "../config.js";
import { queryWallets } from "./util.js";

const schemaCheck = Joi.object({
  ops: Joi.string().optional(),
});

const MAX_SCORE_CALC_AGE = 30;

// Collects metadata about the uploaded media and adds it to the manual review inbox
export const checkXMTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Attestation is verified in middleware before this function is called
  logger.debug("checkXMTP:", req.body);

  const { data } = await supabase
    .from("people_search")
    .select("*")
    .eq("on_xmtp", "unknown"); //NOTE this will only return 1000 at a time.
  //@ts-ignore
  console.log(" supabase select " + JSON.stringify(data.slice(0, 4)));
  const missing_xmtp_for = data?.map((a) => a.pk);
  //@ts-ignore
  console.log(
    " missing_xmtp_for select " +
      JSON.stringify(missing_xmtp_for?.slice(0, 50)),
  );
  //@ts-ignore
  const resi = await queryWallets(missing_xmtp_for);
  console.log("    queryWallets() returned :   " + JSON.stringify(resi));

  1 == 1;
  return res.status(200).send({ status: 200 });
};
