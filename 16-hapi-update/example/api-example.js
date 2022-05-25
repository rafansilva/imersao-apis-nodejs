import Hapi from 'hapi';
import { ContextStrategy as Context } from '../src/db/strategies/base/ContextStrategy.js';
import { MongoDB } from '../src/db/strategies/mongodb/mongodb.js';
import heroSchema from '../src/db/strategies/mongodb/schemas/heroSchema.js';

const init = async () => {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, heroSchema));

  const app = new Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  app.route([{
    path: '/herois',
    method: 'GET',
    handler: (req, res) => {
      return context.read();
    }
  }]);

  await app.start();
  console.log("Server running on %s", app.info.uri);
};

process.on(`unhandledRejection`, (err) => {
  console.log(err);
  process.exit(1);
});

init();