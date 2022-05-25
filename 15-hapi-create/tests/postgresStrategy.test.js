import { Postgres } from "../src/db/strategies/postgres/postgres.js";
import { ContextStrategy } from "../src/db/strategies/base/ContextStrategy.js";
import heroSchema from '../src/db/strategies/postgres/schema/heroSchema.js';

const MOCK_HERO_REGISTER = {
  name: "Spider-Man",
  power: "spider sense"
};

const MOCK_HERO_UPDATE = {
  name: "Batman",
  power: "Money"
};

let context = {};

describe.skip("Postgres Strategy", () => {
  beforeAll(async () => {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, heroSchema);
    context = new ContextStrategy(new Postgres(connection, model));
    await context.delete();
    await context.create(MOCK_HERO_UPDATE);
  });

  test("should connect to postgres", async () => {
    const result = await context.isConnected();
    expect(result).toEqual(true);
  });

  test("should create a new hero", async () => {
    const result = await context.create(MOCK_HERO_REGISTER);
    // delete result.dataValues.id;
    // expect(result.dataValues).toEqual(MOCK_HERO_REGISTER);
    expect(result.dataValues).toBeTruthy();
  });

  test("should read a hero", async () => {
    const [result] = await context.read({ name: MOCK_HERO_REGISTER.name });
    delete result.id;
    expect(result).toEqual(MOCK_HERO_REGISTER);
  });

  test("should update a hero", async () => {
    const [updateItem] = await context.read({ name: MOCK_HERO_UPDATE.name });
    const newItem = {
      ...MOCK_HERO_UPDATE,
      name: "Wonder Woman",
      power: "Super Strength",
    };

    const [result] = await context.update(updateItem.id, newItem);
    const [updatedItem] = await context.read({ id: updateItem.id });
    expect(result).toBeTruthy();
    expect(updatedItem.name).toEqual(newItem.name);
  });

  test("should delete a hero", async () => {
    const [deleteItem] = await context.read({ name: MOCK_HERO_REGISTER.name });
    const result = await context.delete(deleteItem.id);
    expect(result).toBeTruthy();
  });
});