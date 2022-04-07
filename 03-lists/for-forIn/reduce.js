const { getPerson } = require("./service");

Array.prototype.MyReduce = function (callback, initialValue) {
  let finalValue = typeof initialValue !== undefined ? initialValue : this[0];
  for (let index = 0; index <= this.length - 1; index++) {
    finalValue = callback(finalValue, this[index], this);
  }

  return finalValue;
};

async function main() {
  try {
    const { results } = await getPerson("a");

    const weight = results.map((item) => parseInt(item.height));
    console.log("pesos", weight);

    // const total = weight.reduce((before, after) => {
    //   return before + after;
    // }, 0);

    const myList = [
      ["Javascript", "Testes"],
      ["JStack", "FrontPush"],
    ];

    const total = myList
      .MyReduce((before, after) => {
        return before.concat(after);
      }, [])
      .join(", ");

    console.log("total:", total);
  } catch (error) {
    console.log("DEU RUIM:", error);
  }
}

main();
