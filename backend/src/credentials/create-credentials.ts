import { agent } from './index'
import { Request, Response, NextFunction } from 'express'
import {logger} from "../index";

const createCredentials = async (req: Request, res: Response, next: NextFunction) => {
    const identifier = await agent.didManagerGetByAlias({ alias: 'default' })

    const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
            issuer: { id: identifier.did },
            controller: [],
            credentialSubject: {
                id: 'did:web:example.com',
                you: 'Rock',
            },
        },
        proofFormat: 'jwt',
    })
    logger.info(`New credential created`)
    logger.info(verifiableCredential)
    res.send(verifiableCredential)
}

export default createCredentials