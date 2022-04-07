const { get } = require("axios");

const URL = "https://swapi.dev/api/people";

async function getPerson(name) {
  const request = `${URL}/?search=${name}&format=json`;
  const response = await get(request);
  return response.data.results.map(mapPerson);
}

function mapPerson(person) {
  return {
    name: person.name,
    height: person.height,
  };
}

module.exports = { getPerson };
