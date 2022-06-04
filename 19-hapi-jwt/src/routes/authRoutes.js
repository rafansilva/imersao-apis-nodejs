import Joi from 'joi';
import Boom from 'boom';
import { BaseRoute } from './base/baseRoute.js';
import Jwt from 'jsonwebtoken';

const failAction = (request, headers, erro) => {
  throw erro;
};

const USER = {
  username: 'Salve',
  password: '123',
};

export class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super();
    this.secret = secret;
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Login',
        notes: 'Login',
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required(),
          }
        }
      },
      handler: async (request) => {
        const { username, password } = request.payload;

        if (username.toLowerCase() !== USER.username.toLocaleLowerCase() && password !== USER.password) {
          throw Boom.unauthorized('Invalid username or password');
        }

        const token = Jwt.sign({
          username,
          id: 1
        }, this.secret);

        return {
          token,
        };
      }
    };
  }
}