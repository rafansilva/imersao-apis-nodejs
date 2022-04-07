const service = require("./service");

// Uma implementação mais simples do filter
Array.prototype.myFilter = function (callback) {
  const newArray = [];
  for (index in this) {
    const item = this[index];
    const result = callback(item, index, this);
    if (!result) continue;
    newArray.push(item);
  }

  return newArray;
};

async function main() {
  try {
    const { results } = await service.getPerson("a");

    // const familyLars = results.filter((item) => {
    //   // por padrão o filter retorna true ou false
    //   // para informa se deve manter ou remover da lista
    //   // false > remove da lista
    //   // true > mantem na lista
    //   // não encontrou  retorna -1
    //   // encontrou retorna indice
    //   const result = item.name.toLowerCase().indexOf("lars") !== -1;
    //   return result;
    // });

    const familyLars = results.myFilter(
      (item) => item.name.toLowerCase().indexOf("lars") !== -1
    );

    const names = familyLars.map((person) => person.name);
    console.log("nome:", names);
  } catch (error) {
    console.error("DEU RUIM", error);
  }
}

main();
