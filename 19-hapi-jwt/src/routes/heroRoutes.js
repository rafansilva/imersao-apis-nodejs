import Joi from 'joi';
import Boom from 'boom';
import { BaseRoute } from './base/baseRoute.js';

const failAction = (request, headers, erro) => {
  throw erro;
};

const headers = Joi.object({
  authorization: Joi.string().required()
}).unknown();

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
          headers,
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(10),
            name: Joi.string().min(3).max(100)
          }),
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
          return Boom.internal();
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
          headers,
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
          return Boom.internal();
        }
      }
    };
  }

  update() {
    return {
      path: '/herois/{id}',
      method: 'PUT',
      config: {
        tags: ['api'],
        description: 'Atualiza um heroi',
        notes: 'Atualiza um heroi',
        validate: {
          failAction,
          headers,
          params: {
            id: Joi.string().required()
          },
          payload: Joi.object({
            name: Joi.string().min(3).max(100),
            power: Joi.string().min(2).max(100)
          })
        }
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const dataString = JSON.stringify(request.payload);
          const data = JSON.parse(dataString);
          const result = await this.db.update(id, data);

          if (result.modifiedCount !== 1) {
            return Boom.preconditionFailed('Id não encontrado');
          }

          return {
            message: 'Heroi atualizado com sucesso!',
            _id: result._id
          };
        } catch (error) {
          console.log("DEU RUIM: ", error);
          return Boom.internal();
        }
      }
    };
  }

  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      config: {
        tags: ['api'],
        description: 'Deleta um heroi',
        notes: 'Deleta um heroi',
        validate: {
          failAction,
          headers,
          params: {
            id: Joi.string().required()
          }
        }
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);

          if (result.deletedCount !== 1) {
            return Boom.preconditionFailed('Id não encontrado');
          }

          return {
            message: 'Heroi removido com sucesso!',
            _id: id
          };
        } catch (error) {
          console.log("DEU RUIM: ", error);
          return Boom.internal();
        }
      }
    };
  }
}
