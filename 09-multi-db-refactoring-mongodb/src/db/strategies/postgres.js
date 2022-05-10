import { ICrud } from './interfaces/I-Crud.js';
import Sequilize from 'sequelize';

export class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._heroes = null;
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("Postgres isConnected error: ", error);
      return false;
    }
  }

  create(item) {
    return this._heroes.create(item);
  }

  read(query = {}) {
    return this._heroes.findAll({ where: query, raw: true });
  }

  async update(id, item) {
    return await this._heroes.update(item, { where: { id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    return await this._heroes.destroy({ where: query });
  }

  async defineModel() {
    this._heroes = this._driver.define("heroes", {
      id: {
        type: Sequilize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequilize.STRING,
        required: true,
      },
      power: {
        type: Sequilize.STRING,
        required: true,
      }
    }, {
      tableName: "heroes",
      timestamps: false,
      freezeTableName: false,
    });

    await this._heroes.sync();
  }

  async connect() {
    this._driver = new Sequilize(
      'hero',
      'rafa',
      'rafa',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
      }
    );

    await this.defineModel();
  }
}