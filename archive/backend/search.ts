import {Request, Response, NextFunction} from "express";
import axios from "axios";
import {processGraphqlRequest} from "./lib.js";
import {logger} from "./index.js";
import Joi from "joi";
import { config } from "./config.js";


const queryParamSchema = Joi.object({
  // skills: Joi.array().items(Joi.string()).optional(),
  skills: Joi.string().optional(),
  minRating: Joi.number().integer().min(1).max(5).optional(),
  onlyInApp: Joi.boolean().optional()
});

type SearchOutput = {
  name: string;
  website: string; // url
  skills: string[];
  source: "talentlayer";
}

const skillSearch = `
query SearchBySkill ($skill: String) {
  users(where:{
    description_: {
      or: [
        {skills_raw_contains_nocase: $skill}
        {about_contains_nocase: $skill}
        {title_contains_nocase: $skill}    
        {headline_contains_nocase: $skill}
      ]
    }
  }){
    id
    cid
    address
    handle
    description{
      skills_raw
      about
      title
      headline
    }
  }
}`


export const search = async (req: Request, res: Response, next: NextFunction) => {

  const { error, value } = queryParamSchema.validate(req.query);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  console.log(config.talentLayerSubgraphUrl)
  logger.debug("searching TalentLayer for skills", value.skills);
  const rrrr = await axios.all([
    ...value.skills.split(",").map((skill: string) => processGraphqlRequest(config.talentLayerSubgraphUrl, skillSearch, {skill}))
  ])

  const matches = rrrr.map((r: any) => r.data.data.users).flat()
  logger.debug("finished searching TalentLayer for skills", value.skills);
  res.status(200).send(matches);
}

