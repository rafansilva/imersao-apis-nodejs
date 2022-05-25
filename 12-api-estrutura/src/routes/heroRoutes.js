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
        return this.db.read();
      }
    };
  }
}

