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
 *       - in: body
 *         name: requestBody
 *         description: The user/customer to login.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
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