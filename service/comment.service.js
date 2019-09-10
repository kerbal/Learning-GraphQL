import { sequelize, Sequelize } from "../config/sequelize";
import Comment from "../schema/Comment.model";
import ObjectService from "./object.service";

export default class CommentService {
  static async createComment(info) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      const comment = await Comment.create({
        ...info,
        Status: true
      }, {
        transaction: t
      });
      await t.commit();

      return comment;
    }
    catch (error) {
      await t.rollback();
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  static async getComments (option) {
    try {
      const query = {
        where: {
          Status: true
        }
      }

      for(const prop in option) {
        if(option[prop]) {
          query.where[prop] = option[prop];
        }
      }

      const comments = await Comment.findAll(query);

      return comments;
    }
    catch (error) {
      console.log(error.message);
      return [];
    }
  }

  static async getComment (Id) {
    try {
      const comment = await Comment.findOne({
        where: {
          Id,
          Status: true
        }
      });
      return comment;
    }
    catch (error) {
      console.log(error);
      return null;
    }
  }

  static async editComment (info) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      const Id = info.Id;
      ObjectService.deleteProp(info, ['Id', 'Status']);
      await Comment.update({
        ...info
      },{
        where: {
          Id
        }
      });
    }
    catch (error) {
      await t.rollback();
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  static async deleteComment (Id) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      await Comment.update({
        Status: false
      },{
        where: {
          Id
        }
      });
      await t.commit();
    }
    catch (error) {
      await t.rollback();
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}