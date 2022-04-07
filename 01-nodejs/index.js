/*
0 - Obter um usuário;
1 - obter o número de telefone de um usuário a partir de seu ID;
2 - Obter o endereço do usuário a partir do ID;
*/
const util = require("util");

const getAddressAsync = util.promisify(getAddress);

function getUser() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        name: "Fulano",
        birthDate: new Date(),
      });
    }, 1000);
  });
}

function getPhoneNumber(userId) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        ddd: 11,
        number: "123456789",
      });
    }, 2000);
  });
}

function getAddress(userId, callback) {
  setTimeout(function () {
    return callback(null, {
      street: "Rua dos bobos",
      number: 0,
    });
  });
}

main();
async function main() {
  try {
    console.time("medida-Promise");
    const user = await getUser();
    // const phone = await getPhoneNumber(user.id);
    // const address = await getAddressAsync(user.id);
    const result = await Promise.all([
      getPhoneNumber(user.id),
      getAddressAsync(user.id),
    ]);

    const phone = result[0];
    const address = result[1];
    console.log(
      `Nome: ${user.name}\n`,
      `Telefone: (${phone.ddd}) ${phone.number}\n`,
      `Endereço: ${address.street}, ${address.number}\n`
    );
  } catch (error) {
    console.log("DEU RUIM", error);
  }
}

// const userPromise = getUser();

// userPromise
//   .then(function (user) {
//     return getPhoneNumber(user.id).then(function resolveTelefone(result) {
//       return {
//         user: {
//           id: user.id,
//           name: user.name,
//         },
//         phone: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     const address = getAddressAsync(resultado.user.id);
//     return address.then(function resolveEndereco(result) {
//       return {
//         user: resultado.user,
//         phone: resultado.phone,
//         address: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     console.log(
//       `Nome: ${resultado.user.name}\n`,
//       `Telefone: (${resultado.phone.ddd}) ${resultado.phone.number}\n`,
//       `Endereço: ${resultado.address.street}, ${resultado.address.number}\n`
//     );
//   })
//   .catch(function (error) {
//     console.error("DEU RUIM", error);
//   });

// getUser(function resolveUser(error, user) {
//   if (error){
//     console.error('Deu ruim em usuario: ', error);
//     return;
//   }

//   getPhoneNumber(user.id, function resolvePhoneNumber(error1, phone) {
//     if (error1) {
//       console.error('Deu ruim em telefone: ', error1);
//       return;
//     }

//     getAddress(user.id, function resolveAddress(error2, address) {
//       if (error2) {
//         console.error('Deu ruim em endereço: ', error2);
//         return;
//       }

//       console.log(`
//         Nome: ${user.name},
//         Telefone: (${phone.ddd}) ${phone.number},
//         Endereço: ${address.street}, ${address.number}
//       `);
//     })
//   });
// });

// const user = getUser();
// const phone = getPhoneNumber(user.id);

// console.log('Telefone: ', phone);
