class NotImplementedException extends Error {
  constructor() {
    super("Not implemented Exception");
  }
}

export class ICrud {
  isConnected() {
    throw new NotImplementedException();
  }

  connect() {
    throw new NotImplementedException();
  }

  create(item) {
    throw new NotImplementedException();
  }

  read(query) {
    throw new NotImplementedException();
  }

  update(id, item) {
    throw new NotImplementedException();
  }

  delete(id) {
    throw new NotImplementedException();
  }
}