import api from "../src/api.js";

let app = {};

const MOCK_HEROI_CADASTRAR = {
  name: "Gavião Arqueiro",
  power: "Flechas",
};

const MOCK_HEROI_ATUALIZAR = {
  name: "Mulher Maravilha",
  power: "Super Força",
};

let MOCK_ID = '';

describe("Suite tests for API Heros", () => {
  beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: JSON.stringify(MOCK_HEROI_ATUALIZAR),
    });

    const data = JSON.parse(result.payload);
    MOCK_ID = data._id;
  });

  test("should return list in the /herois", async () => {
    expect.assertions(2);
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=10",
    });

    const data = JSON.parse(result.payload);
    expect(result.statusCode).toBe(200);
    expect(Array.isArray(data)).toBeTruthy();
  });

  test("should be list 4 heroes in /herois", async () => {
    expect.assertions(2);
    const TAMANHO_LISTA = 4;
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LISTA}`,
    });

    const data = JSON.parse(result.payload);

    expect(result.statusCode).toBe(200);
    expect(data.length).toEqual(TAMANHO_LISTA);
  });

  test("should be return error if query's not valid in /herois", async () => {
    expect.assertions(2);
    const TAMANHO_LISTA = "AAAEEEE";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LISTA}`,
    });

    const errorResult = {
      statusCode: 400,
      error: 'Bad Request',
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: { source: 'query', keys: ['limit'] }
    };

    const message = JSON.stringify(errorResult);
    expect(result.statusCode).toBe(400);
    expect(result.payload).toEqual(message);
  });

  test("should be return one item in /herois", async () => {
    expect.assertions(2);
    const NAME = MOCK_HEROI_CADASTRAR.name;
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=10&name=${NAME}`,
    });

    const data = JSON.parse(result.payload);
    expect(result.statusCode).toBe(200);
    expect(data[0].name).toEqual(NAME);
  });

  test("should be created when post in /herois", async () => {
    expect.assertions(3);
    const result = await app.inject({
      method: "POST",
      url: "/herois",
      payload: MOCK_HEROI_CADASTRAR,
    });

    const data = JSON.parse(result.payload);
    const { message, _id } = data;

    expect(result.statusCode).toBe(200);
    expect(_id).toBeDefined();
    expect(message).toEqual("Heroi cadastrado com sucesso!");
  });

  test("should be patch when put in /herois/:id", async () => {
    expect.assertions(2);
    const _id = MOCK_ID;
    const expected = {
      power: "Laço",
    };

    const result = await app.inject({
      method: "PUT",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
    });

    const data = JSON.parse(result.payload);
    const { message } = data;

    expect(result.statusCode).toBe(200);
    expect(message).toEqual("Heroi atualizado com sucesso!");
  });

  test("should be return error if id not valid in /herois/:id", async () => {
    expect.assertions(2);
    const _id = `62733d46d41166f2b1763e16`;
    const expected = {
      power: "Laço",
    };

    const result = await app.inject({
      method: "PUT",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
    });

    const { message } = JSON.parse(result.payload);
    expect(result.statusCode).toBe(412);
    expect(message).toEqual("Id não encontrado");
  });

  test("should be delete when delete in /herois/:id", async () => {
    expect.assertions(2);
    const _id = MOCK_ID;
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
    });

    const data = JSON.parse(result.payload);
    const { message } = data;

    expect(result.statusCode).toBe(200);
    expect(message).toEqual("Heroi removido com sucesso!");
  });

  test("should be return error if id not valid in /herois/:id", async () => {
    expect.assertions(2);
    const _id = `62733d46d41166f2b1763e16`;

    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
    });

    const { message } = JSON.parse(result.payload);
    expect(result.statusCode).toBe(412);
    expect(message).toEqual("Id não encontrado");
  });
});