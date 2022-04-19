const { Command } = require("commander");
const Database = require("./database");
const Hero = require("./hero");

async function main() {
  const program = new Command();

  program
    .version("v1")
    .option("-n, --name [value]", "Hero name")
    .option("-p, --power [value]", "Hero power")
    .option("-i, --id [value]", "Hero id")
    .option("-c, --create", "Create hero")
    .option("-l, --list", "List heroes")
    .option("-r, --remove", "Remove hero")
    .option("-u, --update [value]", "Update hero")
    .parse(process.argv);

  const options = program.opts();
  const hero = new Hero(options);

  try {
    if (options.create) {
      delete hero.id;

      const result = await Database.register(hero);
      if (!result) {
        console.error("Hero not created");
        return;
      }
      console.info(`Hero created`);
    }

    if (options.list) {
      const result = await Database.list();
      if (!result) {
        console.error("Heroes not found");
        return;
      }
      console.log(result);
    }

    if (options.remove) {
      const result = await Database.remove(hero.id);
      if (!result) {
        console.error("Hero not removed");
        return;
      }
      console.info(`Hero removed`);
    }

    if (options.update) {
      const idToUpdate = parseInt(options.update);
      const data = JSON.stringify(hero);
      const UpdateHero = JSON.parse(data);
      const result = await Database.update(idToUpdate, UpdateHero);
      if (!result) {
        console.error("Hero not updated");
        return;
      }
      console.info(`Hero updated`);
    }

  } catch (error) {
    console.log("DEU RUIM", error);
  }
}

main();
