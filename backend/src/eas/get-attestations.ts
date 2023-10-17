import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { supabase } from "../config.js";

import { getAllAttestations } from "lib";

const schema = Joi.object({
  address: Joi.string().required(),
});

// Below is just a convenience function to render attestations in Postman. The meat of it is in /lib
export const getAttestationsForAddress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { address } = value;

  console.log("Getting attestations for address", address);

  const attestations = await getAllAttestations(supabase, address);
  console.log("Finished getting attestations");
  res.status(200).json(attestations);
};
