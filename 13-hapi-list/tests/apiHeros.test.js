import api from "../src/api.js";

let app = {};

describe("Suite tests for API Heros", () => {
  beforeAll(async () => {
    app = await api;
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
    const TAMANHO_LISTA = "AAAEEEE";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LISTA}`,
    });

    const message = JSON.parse(result.payload).message;
    expect(message).toEqual("Erro interno no servidor");
  });

  test("should be return error if query's not valid in /herois", async () => {
    expect.assertions(2);
    const NAME = "Mulher Aranha";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=10&name=${NAME}`,
    });

    const data = JSON.parse(result.payload);
    expect(result.statusCode).toBe(200);
    expect(data[0].name).toEqual(NAME);
  });
});