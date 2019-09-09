import { sequelize, Sequelize } from "../config/sequelize";
import User from "./user.model";

export default class Post extends Sequelize.Model {};
Post.init(
  {
    Id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    Title: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
    Body: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    Published: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    User_Id: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'Id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
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