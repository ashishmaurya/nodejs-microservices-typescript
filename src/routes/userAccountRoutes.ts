import express, { Router } from 'express';
import * as userRepositories from '../repositories/userRepositories';
import { IUser } from '../repositories/userRepositories';
import userValidators from '../validators/userValidators';
import jwt from 'jsonwebtoken';
import logger from '../logger';
const router = Router();

/**
 * @swagger
 *
 * /login:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: User's Email ID
 *         in: formdata
 *         required: true
 *         schema:
 *              type: string 
 *       - name: password
 *         in: formdata
 *         required: true
 *         type: string
 */
router.post("/login", userValidators.userLogin, async function (req: express.Request, res: express.Response) {
    try {
        let user = await userRepositories.validateUser(req.body)
        if (user) {
            let userObj = user as IUser
            let token = jwt.sign({
                email: userObj.email,
            }, process.env.JWT_TOKEN as string)

            res.json({ message: "Logged In user", user: user, token: token })
        } else {
            res.json({ message: "Invalid email or password" })
        }
    } catch (err) {
        logger.error(err)
        res.json({ error: err, messgae: "something went wrong" });
    }
})

export default router