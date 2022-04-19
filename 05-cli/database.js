const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.FILE_NAME = "heros.json";
  }

  async getFileData() {
    const file = await readFileAsync(this.FILE_NAME, "utf8");
    return JSON.parse(file.toString());
  }

  async writeFile(data) {
    await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
    return true;
  }

  async register(hero) {
    const data = await this.getFileData();
    const id = hero.id <= data.length ? hero.id : data.length + 1;

    const heroWithId = {
      ...hero,
      id,
    };

    const newData = [...data, heroWithId];

    const result = await this.writeFile(newData);
    return result;
  }

  async list(id) {
    const data = await this.getFileData();
    const filterData = data.filter((item) => (id ? item.id === id : true));
    return filterData;
  }

  async remove(id) {
    if (!id) {
      return await this.writeFile([]);
    }

    const data = await this.getFileData();
    const index = data.findIndex((item) => item.id === parseInt(id));

    if (index === -1) {
      throw new Error("Hero not found");
    }

    data.splice(index, 1);
    return await this.writeFile(data);
  }

  async update(id, updateHero) {
    const data = await this.getFileData();
    const index = data.findIndex((item) => item.id === parseInt(id));
    if (index === -1) {
      throw new Error("Hero not found");
    }

    const actual = data[index];
    const updateData = {
      ...actual,
      ...updateHero,
    };

    data.splice(index, 1);

    return await this.writeFile([...data, updateData]);
  }
}

module.exports = new Database();
