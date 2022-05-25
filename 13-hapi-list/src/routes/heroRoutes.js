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
      handler: (request, response) => {
        try {
          const { skip, limit, name } = request.query;
          let query = {};
          if (name) {
            query.name = name;
          }

          if (isNaN(skip) && skip) {
            throw new Error('skip is not a number');
          }

          if (isNaN(limit) && limit) {
            throw new Error('limit is not a number');
          }

          return this.db.read(
            query,
            parseInt(skip),
            parseInt(limit),
          );
        } catch (error) {
          console.log("DEU RUIM: ", error);
          return { message: "Erro interno no servidor" };
        }
      }
    };
  }
}

