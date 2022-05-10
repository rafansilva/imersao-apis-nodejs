import Sequilize from 'sequelize';

const drive = new Sequilize(
  'hero',
  'rafa',
  'rafa',
  {
    host: 'localhost',
    dialect: 'postgres',
    quoteIdentifiers: false,
    operatorsAliases: false,
  }
);

async function main() {
  const heroes = drive.define("heroes", {
    id: {
      type: Sequilize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequilize.STRING,
      required: true,
    },
    power: {
      type: Sequilize.STRING,
      required: true,
    }
  }, {
    tableName: "heroes",
    timestamps: false,
    freezeTableName: false,
  });

  await heroes.sync();
  // await heroes.create({
  //   name: "Logan",
  //   power: "Regeneration",
  // });

  const result = await heroes.findAll({ raw: true, attributes: ["name"] });
  console.log('result: ', result);
}

main();