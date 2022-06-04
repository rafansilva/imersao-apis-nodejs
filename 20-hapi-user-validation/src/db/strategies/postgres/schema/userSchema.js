import Sequilize from 'sequelize';

const userSchema = {
  name: 'users',
  schema: {
    id: {
      type: Sequilize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequilize.STRING,
      unique: true,
      required: true,
    },
    password: {
      type: Sequilize.STRING,
      required: true,
    }
  },
  options: {
    tableName: 'users',
    timestamps: false,
    freezeTableName: false,
  }
};

export default userSchema;