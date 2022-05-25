import Joi from 'joi';
import { BaseRoute } from './base/baseRoute.js';

const failAction = (request, headers, erro) => {
  throw erro;
};

export class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  find() {
    return {
      path: '/herois',
      method: 'GET',
      config: {
        tags: ['api'],
        description: 'Lista todos os herois',
        notes: 'Lista todos os herois',
        validate: {
          failAction,
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            name: Joi.string().min(3).max(100)
          })
        }
      },
      handler: (request, response) => {
        try {
          const { skip, limit, name } = request.query;
          const query = name ? { name: { $regex: `.*${name}*.` } } : {};

          return this.db.read(
            query,
            skip,
            limit,
          );
        } catch (error) {
          console.log("DEU RUIM: ", error);
          return { message: "Erro interno no servidor" };
        }
      }
    };
  }

  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
        tags: ['api'],
        description: 'Cadastra um heroi',
        notes: 'Cadastra um heroi',
        validate: {
          failAction,
          payload: Joi.object({
            name: Joi.string().required().min(3).max(100),
            power: Joi.string().required().min(2).max(100)
          })
        }
      },
      handler: async (request) => {
        try {
          const { name, power } = request.payload;
          const result = await this.db.create({ name, power });

          return {
            message: 'Heroi cadastrado com sucesso!',
            _id: result._id
          };
        } catch (error) {
          console.log("DEU RUIM: ", error);
          return { message: "Erro interno no servidor" };
        }
      }
    };
  }
}
