import api from "../src/api.js";

let app = {};

describe("Suite tests for API Heros", () => {
  beforeAll(async () => {
    app = await api;
  });

  test("should return list in the /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois",
    });

    const data = JSON.parse(result.payload);
    expect(result.statusCode).toBe(200);
    expect(Array.isArray(data)).toBeTruthy();
  });
});