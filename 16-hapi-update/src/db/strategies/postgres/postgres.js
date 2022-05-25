import { ICrud } from '../interfaces/I-Crud.js';
import Sequilize from 'sequelize';

export class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.log("Postgres isConnected error: ", error);
      return false;
    }
  }

  create(item) {
    return this._schema.create(item);
  }

  read(query = {}) {
    return this._schema.findAll({ where: query, raw: true });
  }

  async update(id, item) {
    return await this._schema.update(item, { where: { id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    return await this._schema.destroy({ where: query });
  }

  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name, schema.schema, schema.options
    );

    await model.sync();
    return model;
  }

  static connect() {
    const connection = new Sequilize(
      'hero',
      'rafa',
      'rafa',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
        logging: false
      }
    );

    connection.afterConnect(() => console.log('Postgres conectado!'));
    return connection;
  }
}