import Hapi from 'hapi';
import { ContextStrategy as Context } from './db/strategies/base/ContextStrategy.js';
import { MongoDB } from './db/strategies/mongodb/mongodb.js';
import { HeroSchema } from './db/strategies/mongodb/schemas/heroSchema.js';
import { HeroRoutes } from './routes/heroRoutes.js';
import { AuthRoutes } from './routes/authRoutes.js';
import HapiSwagger from 'hapi-swagger';
import Vision from 'vision';
import Inert from 'inert';
import HapiJwt from 'hapi-auth-jwt2';
import { Postgres } from './db/strategies/postgres/postgres.js';
import userSchema from './db/strategies/postgres/schema/userSchema.js';

const JWT_SECRET = 'MEU_SEGREDAO_123';
const swaggerConfig = {
  info: {
    title: 'API Herois - #CursoNodeBR',
    version: 'v1.0',
  }
};

const app = new Hapi.Server({
  port: 5000,
  host: 'localhost',
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function init() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroSchema));

  const connectionPostgres = await Postgres.connect();
  const model = await Postgres.defineModel(connectionPostgres, userSchema);
  const contextPostgres = new Context(new Postgres(connectionPostgres, model));

  await app.register([
    HapiJwt,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerConfig
    }
  ]);

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: async (dado, request) => {
      return {
        isValid: true
      };
    }
  });

  app.auth.default('jwt');
  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres), AuthRoutes.methods())
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