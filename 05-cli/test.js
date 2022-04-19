const { deepEqual, ok } = require("assert");
const database = require("./database");

const DEFAULT_REGISTER_ITEM = {
  id: 1,
  name: "Flash",
  power: "Speed",
};

const DEFAULT_UPDATE_ITEM = {
  id: 2,
  name: "Wonder Woman",
  power: "superhuman strength",
};

describe("Manipulation suite  of the heros", () => {
  before(async () => {
    await database.register(DEFAULT_REGISTER_ITEM);
    await database.register(DEFAULT_UPDATE_ITEM);
  });

  it("Should be able list a hero", async () => {
    const expected = DEFAULT_REGISTER_ITEM;
    const [result] = await database.list(expected.id);

    deepEqual(result, expected);
  });

  it("Should be able to create a hero", async () => {
    const expected = DEFAULT_REGISTER_ITEM;
    await database.register(DEFAULT_REGISTER_ITEM);
    const [actual] = await database.list(DEFAULT_REGISTER_ITEM.id);

    deepEqual(actual, expected);
  });

  it("Should be able to remove a hero", async () => {
    const expected = true;
    const result = await database.remove(DEFAULT_REGISTER_ITEM.id);

    deepEqual(result, expected);
  });

  it("Should be able to update a hero", async () => {
    const expected = {
      ...DEFAULT_UPDATE_ITEM,
      name: "Batman",
      power: "Money",
    };

    const newData = {
      name: "Batman",
      power: "Money",
    };

    await database.update(DEFAULT_UPDATE_ITEM.id, newData);
    const [result] = await database.list(DEFAULT_UPDATE_ITEM.id);

    deepEqual(result, expected);
  });
});
