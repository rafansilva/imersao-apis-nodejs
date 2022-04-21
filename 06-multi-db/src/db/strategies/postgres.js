import { ICrud } from './interfaces/I-Crud.js';

export class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Postgres create");
  }

  read(query) {
    console.log("Postgres read");
  }

  update(id, item) {
    console.log("Postgres update");
  }

  delete(id) {
    console.log("Postgres delete");
  }
}