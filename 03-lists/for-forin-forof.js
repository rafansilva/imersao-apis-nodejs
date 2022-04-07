const service = require("./service");

async function main() {
  try {
    const result = await service.getPerson("a");
    const names = [];

    console.time("for");
    for (let i = 0; i < result.results.length; i++) {
      const person = result.results[i];
      names.push(person.name);
    }
    console.timeEnd("for");

    console.time("forIn");
    for (let peoples in result.results) {
      const person = result.results[peoples];
      names.push(person.name);
    }
    console.timeEnd("forIn");

    console.time("forOf");
    for (peoples of result.results) {
      names.push(peoples.name);
    }
    console.timeEnd("forOf");

    console.time("forEach");
    result.results.forEach((element) => {
      names.push(element.name);
    });
    console.timeEnd("forEach");

    console.log("nomes:", names);
  } catch (error) {
    console.log("DEU RUIM", error);
  }
}

main();
