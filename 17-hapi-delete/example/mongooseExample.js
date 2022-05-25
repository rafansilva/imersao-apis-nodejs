import Mongoose from 'mongoose';

Mongoose.connect('mongodb://rafael:rafael@localhost:27017/heroes', function (error) {
  if (!error) return;
  console.log('Falha na conexão! ', error);
});

const connection = Mongoose.connection;

/*
  0: disconnected
  1: connected
  2: connecting
  3: disconnecting
*/
connection.once('open', () => console.log('MongoDB conectado!'));
// setTimeout(() => {
//   const state = connection.readyState;
//   console.log('State: ', state);
// }, 1000);



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
    default: new Date()
  }
});

const model = new Mongoose.model('herois', heroSchema);

async function main() {
  const resultCreate = await model.create({
    name: 'Logan' + Date.now(),
    power: 'Regeneration',
  });

  console.log('resultCreate: ', resultCreate);

  const result = await model.find();
  console.log('result: ', result);

  // await model.remove({});
}

main();
