import api from "../src/api.js";
import { ContextStrategy } from "../src/db/strategies/base/ContextStrategy.js";
import { Postgres } from "../src/db/strategies/postgres/postgres.js";
import userSchema from "../src/db/strategies/postgres/schema/userSchema.js";


let app = {};
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhbHZlIiwiaWQiOjEsImlhdCI6MTY1MzUzMzMxN30.kLWaH4JTsndRMxVrJQ-Ru_zsAmEyNexLsf5ks_2O2-M";

const USER = {
  username: "Salve",
  password: "123",
};

const USER_BD = {
  ...USER,
  password: "$2b$04$M2Ggel52WS85sawvlmkheut.FLroXJ2kslmjN/F8SYmArnm0YnKuW",
};

describe("Suit auth tests", () => {
  beforeAll(async () => {
    app = await api;
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, userSchema);
    const postgres = new ContextStrategy(new Postgres(connection, model));
    await postgres.update(null, USER_BD, true);
  });

  test("should return token", async () => {
    expect.assertions(2);
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: USER_BD
    });

    console.log(result.payload);

    const statusCode = await result.statusCode;
    const data = JSON.parse(result.payload);

    expect(statusCode).toBe(200);
    expect(data.token.length).toBeGreaterThan(10);

  });



});