import { ContextStrategy } from './db/strategies/base/ContextStrategy.js';
import { MongoDB } from './db/strategies/mongodb.js';
import { Postgres } from './db/strategies/postgres.js';


const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();