import { ICrud } from './interfaces/I-Crud.js';
import Mongoose from 'mongoose';

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
  4: 'Invalid credentials',
}


export class MongoDB extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._heroes = null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === 'Connected') return state;

    if (state !== 'Connecting') return state;

    await new Promise(resolve => setTimeout(resolve, 1000));

    return STATUS[this._driver.readyState];
  }

  connect() {
    Mongoose.connect('mongodb://rafael:rafael@localhost:27017/heroes', function (error) {
      if (!error) return;
      console.log('Falha na conexão! ', error);
    });

    const connection = Mongoose.connection;
    connection.once('open', () => console.log('MongoDB conectado!'));

    this._driver = connection;
    this.defineModel();
  }

  defineModel() {
    const heroSchema = new Mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      power: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: Date().toLocaleString("pt-BR")
      }
    });

    this._heroes = new Mongoose.model('herois', heroSchema);
  }

  create(item) {
    return this._heroes.create(item);
  }

  read(query, skip = 0, limit = 10) {
    return this._heroes.find(query).skip(skip).limit(limit);
  }

  update(id, item) {
    return this._heroes.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._heroes.deleteOne({ _id: id });
  }
}