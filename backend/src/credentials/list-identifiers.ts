import { agent } from './index'
import { Request, Response, NextFunction } from 'express'
import {logger} from "../index";


const listIdentifiers = async (req: Request, res: Response, next: NextFunction) => {
    const identifiers = await agent.didManagerFind()

    logger.debug(`There are ${identifiers.length} identifiers`)

    if (identifiers.length > 0) {
        identifiers.map((id) => {
            logger.debug(id)
            logger.debug('..................')
        })
    }

    res.send(identifiers)
}

export default listIdentifiers