const service = require("./service");

// Array.prototype.myMap = function (callback) {
//   const newArray = [];
//   for (let i = 0; i < this.length; i++) {
//     newArray.push(callback(this[i], i));
//   }

//   return newArray;
// };

async function main() {
  try {
    const result = await service.getPerson("a");
    // const names = [];
    // result.results.forEach((item) => {
    //   names.push(item.name);
    // });

    // const names = result.results.map(function (item) {
    //   return item.name;
    // });

    // const names = result.results.map((person) => person.name);

    const names = result.results.myMap(
      (person, indice) => person.name + " - " + indice
    );

    // const names = result.results.myMap((person, indice) => person.name);

    console.log("nome:", names);
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();
