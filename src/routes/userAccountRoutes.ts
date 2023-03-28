import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import * as userRepositories from '../repositories/userRepositories';
import { IUser } from '../repositories/userRepositories';
import userValidators from '../validators/userValidators';
import logger from '../logger';
import { IAppRoute } from './IAppRoute';

/**
 * @openapi
 * components:
 *    securitySchemes:
 *      apiAuthorization:
 *          type: "apiKey"
 *          name: "authorization"
 *          in: "header"
 *      
 * 
 * 
 */

interface ILoginRequestBody{
  username: string;
  password: string;
}

class UserAccountRoutes implements IAppRoute {
  router: express.Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.post('/login', userValidators.userLogin, this.login);
    this.router.get('/hi', this.sayHi);
  }

  /**
   * @openapi
   * /login:
   *   post:
   *     tags: 
   *      - login
   *     description: Login into microservice
   *     requestBody:
   *        description: Login request Body
   *        content:
   *          application/json:
   *            schema:
   *              $ref: "#/components/schemas/LoginRequestBody"
   *            examples:
   *              loginSuccess:
   *                $ref: "#/components/examples/LoginSuccess"
   *     responses:
   *       200:
   *         description: returns successfull login user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/components/schemas/LoginRequestBody" 
   *             examples:
   *               loginResponse:
   *                  $ref: "#/components/examples/LoginResponse"
   */
  private async login(req: express.Request<any,any,ILoginRequestBody>, res: express.Response) {
    try {
      const user = await userRepositories.validateUser(req.body);
      if (user) {
        const userObj = user as IUser;
        const token = jwt.sign(
          {
            email: userObj.email,
          },
          process.env.JWT_TOKEN as string
        );

        res.json({ message: 'Logged In user', user, token });
      } else {
        res.json({ message: 'Invalid email or password' });
      }
    } catch (err) {
      logger.error(err);
      res.json({ error: err, messgae: 'something went wrong' });
    }
  }

  /**
   * @openapi
   * /hi:
   *   get:
   *     tags: 
   *      - hi
   *     description: Welcome to nodejs-microservices!
   *     security:
   *        - apiAuthorization: []
   *     parameters:
   *        - $ref: '#/components/parameters/productId'
   *     responses:
   *       200:
   *         description: Returns a hello from server string.
   */
  private async sayHi(req: express.Request, res: express.Response) {
    res.status(200).send('Hello from server');
  }
}

export default () => {
  return new UserAccountRoutes().router;
};
