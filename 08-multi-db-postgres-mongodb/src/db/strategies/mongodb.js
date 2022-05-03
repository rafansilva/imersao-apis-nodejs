import { ICrud } from './interfaces/I-Crud.js';

export class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("MongoDB create");
  }

  read(query) {
    console.log("MongoDB read");
  }

  update(id, item) {
    console.log("MongoDB update");
  }

  delete(id) {
    console.log("MongoDB delete");
  }
}