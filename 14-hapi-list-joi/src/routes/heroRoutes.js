import Joi from 'joi';
import { BaseRoute } from './base/baseRoute.js';

export class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  findAll() {
    return {
      path: '/herois',
      method: 'GET',
      config: {
        tags: ['api'],
        description: 'Lista todos os herois',
        notes: 'Lista todos os herois',
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
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
}

