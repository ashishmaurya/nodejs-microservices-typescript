import express from 'express';
import jwt from 'jsonwebtoken';

export default function (req: express.Request, res: express.Response, next: express.NextFunction) {
    let auth = req.headers.authorization;
    if (auth) {
        let authToken = auth.split(" ").pop() as string
        let token = jwt.verify(authToken, process.env.JWT_TOKEN as string);
        if (token) {
            (req as any).user = token;
            next()
            return;
        }
    }

    res.status(401).send("Unauthorized")
}