import { sequelize, Sequelize } from "../config/sequelize";

export default class User extends Sequelize.Model {}
User.init(
  {
    Id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    Username: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
    Name: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
    Email: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    Age: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    Gender: {
      type: Sequelize.ENUM('male', 'female'),
      defaultValue: 'male'
    },
    Status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    timestamps: true,
    freezeTableName: true
  }
);