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

const JWT_SECRET = 'MEU_SEGREDAO_123';
const swaggerConfig = {
  info: {
    title: 'API Herois - #CursoNodeBR',
    version: 'v1.0',
  }
};

const app = new Hapi.server({
  port: 5000,
  host: 'localhost',
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function init() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroSchema));

  // await app.register([
  //   HapiJwt,
  //   Vision,
  //   Inert,
  //   {
  //     plugin: HapiSwagger,
  //     options: swaggerConfig
  //   }
  // ]);

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
    ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
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