import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { bulkVerifyAttestations } from "lib";

const schema = Joi.object({
  //TODO Fill out the full schema later
  attestations: Joi.array().items(Joi.object({})).required(),
  returnType: Joi.string().valid("objects", "ids", "bool").default("ids"),
});

export const verifyAttestations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = schema.validate(req.body, {
    allowUnknown: true,
  });
  console.log(error, value)
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { attestations, returnType } = value;

  const { validAttestations, invalidAttestations } =
    bulkVerifyAttestations(attestations);

  switch (returnType) {
    case "objects":
      return res.status(200).json({ validAttestations, invalidAttestations });
    default:
      return res.status(200).json({
        validAttestations: validAttestations.map(
          (attestation) => attestation.sig.uid
        ),
        invalidAttestations: invalidAttestations.map(
          (attestation) => attestation.sig.uid
        ),
      });
  }

};
