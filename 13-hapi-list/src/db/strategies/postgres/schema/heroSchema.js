import Sequilize from 'sequelize';

const heroSchema = {
  name: 'heroes',
  schema: {
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
  },
  options: {
    tableName: 'heroes',
    timestamps: false,
    freezeTableName: false,
  }
};

export default heroSchema;