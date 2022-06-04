import { ICrud } from '../interfaces/I-Crud.js';

export class ContextStrategy extends ICrud {
  constructor(database) {
    super();
    this._database = database;
  }

  static connect() {
    return this._database.connect();
  }

  isConnected() {
    return this._database.isConnected();
  }

  create(item) {
    return this._database.create(item);
  }

  read(query, skip, limit) {
    return this._database.read(query, skip, limit);
  }

  update(id, item, upsert = false) {
    return this._database.update(id, item, upsert);
  }

  delete(id) {
    return this._database.delete(id);
  }
}
