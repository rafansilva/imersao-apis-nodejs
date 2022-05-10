import { ICrud } from '../interfaces/I-Crud.js';
import Mongoose from 'mongoose';

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
  4: 'Invalid credentials',
};


export class MongoDB extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === 'Connected') return state;

    if (state !== 'Connecting') return state;

    await new Promise(resolve => setTimeout(resolve, 1000));

    return STATUS[this._connection.readyState];
  }

  static connect() {
    Mongoose.connect('mongodb://rafael:rafael@localhost:27017/heroes', function (error) {
      if (!error) return;
      console.log('Falha na conexão! ', error);
    });

    const connection = Mongoose.connection;
    connection.once('open', () => console.log('MongoDB conectado!'));

    return connection;
  }

  create(item) {
    return this._schema.create(item);
  }

  read(query, skip = 0, limit = 10) {
    return this._schema.find(query).skip(skip).limit(limit);
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}