import Joi from 'joi';

const userLoginJOI = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export default {
  userLogin(req: any, res:any, next:any) {
    // Validate Incoming request
    const { error, value } = userLoginJOI.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });
    if (error) {
      res.json({ error });
      return;
    }
    req.body = value;
    next();
  },

};
