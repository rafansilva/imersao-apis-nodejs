import EventEmitter from "events";

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();
const nomeEvento = "usuario:click";

meuEmissor.on(nomeEvento, function (click) {
  console.log("um usuario clicou", click);
});

// meuEmissor.emit(nomeEvento, "na barra de rolagem");
// meuEmissor.emit(nomeEvento, "no ok");

// let count = 0;
// setInterval(function () {
//   meuEmissor.emit(nomeEvento, "no ok " + count++);
// }, 1000);

// const stdin = process.openStdin();
// stdin.addListener("data", function (value) {
//   const data = value.toString().trim();
//   console.log("Você digitou: " + data);
// });

// Nunca fazer assim, pois a promise tem o objetivo de executar apenas uma vez, já os eventos são executados continuamente
// function main() {
//   return new Promise((resolve, reject) => {
//     const stdin = process.openStdin();
//     stdin.addListener("data", function (value) {
//       const data = value.toString().trim();
//       //   console.log("Você digitou: " + data);
//       return resolve(value);
//     });
//   });
// }

// main()
//   .then((result) => {
//     console.log("resultado", result.toString().trim());
//   })
//   .catch((err) => {});
