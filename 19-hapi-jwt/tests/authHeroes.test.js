import api from "../src/api.js";

let app = {};
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhbHZlIiwiaWQiOjEsImlhdCI6MTY1MzUzMzMxN30.kLWaH4JTsndRMxVrJQ-Ru_zsAmEyNexLsf5ks_2O2-M";


describe("Suit auth tests", () => {
  beforeAll(async () => {
    app = await api;
  });

  test("should return token", async () => {
    expect.assertions(2);
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: "Salve",
        password: "123",
      }
    });

    const statusCode = await result.statusCode;
    const data = JSON.parse(result.payload);

    console.log(data);

    expect(statusCode).toBe(200);
    expect(data.token.length).toBeGreaterThan(10);

  });



});