import Hapi from 'hapi';
import { ContextStrategy as Context } from './db/strategies/base/ContextStrategy.js';
import { MongoDB } from './db/strategies/mongodb/mongodb.js';
import { HeroSchema } from './db/strategies/mongodb/schemas/heroSchema.js';
import { HeroRoutes } from './routes/heroRoutes.js';

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function init() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroSchema));

  const app = new Hapi.server({
    port: 5000,
    host: 'localhost',
  });

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
  ]);

  await app.start();
  console.log("Server running on %s", app.info.uri);

  return app;
};

process.on(`unhandledRejection`, (err) => {
  console.log(err);
  process.exit(1);
});

export default init();