import {NextFunction, Request, Response} from "express";

const getCredentials = async (req: Request, res: Response, next: NextFunction) => {
    res.send("getCredentials not implemented yet")
}

export default getCredentials