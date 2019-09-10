import { sequelize, Sequelize } from "../config/sequelize";
import User from "./user.model";
import Post from "./Post.model";

export default class Comment extends Sequelize.Model {}
Comment.init(
  {
    Id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    Body: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
    User_Id: {
      type: Sequelize.UUID,
      references: {
        model: User,
        key: 'Id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    Post_Id: {
      type: Sequelize.UUID,
      references: {
        model: Post,
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