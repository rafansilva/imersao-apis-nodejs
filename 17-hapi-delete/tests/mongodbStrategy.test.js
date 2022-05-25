import { MongoDB } from "../src/db/strategies/mongodb/mongodb.js";
import { ContextStrategy } from "../src/db/strategies/base/ContextStrategy.js";
import { HeroSchema } from "../src/db/strategies/mongodb/schemas/heroSchema.js";

const MOCK_HERO_REGISTER = {
  name: "Wonder Woman",
  power: "super strength",
};

const MOCK_HERO_LOGAN = {
  name: "Logan",
  power: "Regeneration",
};

const MOCK_HERO_UPDATE = {
  name: "Spider-man",
  power: "spider sense",
};

let MOCK_HERO_ID = "";

let context = {};

describe.skip("MongoDB Strategy", () => {
  beforeAll(async () => {
    const connection = MongoDB.connect();
    context = new ContextStrategy(new MongoDB(connection, HeroSchema));
    await context.create(MOCK_HERO_LOGAN);
    const result = await context.create(MOCK_HERO_UPDATE);
    MOCK_HERO_ID = result._id;
  });

  test("should connect to mongodb", async () => {
    const result = await context.isConnected();
    const expectedString = 'Connected';
    expect(expectedString).toEqual(result);
  });

  test("should create a new hero", async () => {
    const { name, power } = await context.create(MOCK_HERO_LOGAN);
    expect({ name, power }).toEqual(MOCK_HERO_LOGAN);
  });

  test("should read a hero", async () => {
    const [{ name, power }] = await context.read({ name: MOCK_HERO_REGISTER.name });
    const expectedObject = { name, power };
    expect(expectedObject).toEqual(MOCK_HERO_REGISTER);
  });

  test('should update a hero', async () => {
    const result = await context.update(MOCK_HERO_ID, {
      name: "Mulher Aranha",
    });

    expect(result.modifiedCount).toBe(1);
  });

  test('should delete a hero', async () => {
    const result = await context.delete(MOCK_HERO_ID);
    expect(result.deletedCount).toBe(1);
  });
});