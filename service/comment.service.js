import { sequelize } from "../config/sequelize";
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
        query.where[prop] = option[prop];
      }

      const comments = await Comment.findAll(query);

      return comments;
    }
    catch (error) {
      console.log(error.message);
      return [];
    }
  }

  static async editComment (info) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      const Id = info.Id;
      ObjectService.deleteProp(info, ['Id', 'Status']);
      const comment = await Comment.update({
        ...info
      },{
        where: {
          Id
        }
      });

      return comment;
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
      const comment = await Comment.update({
        Status: false
      },{
        where: {
          Id
        }
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
}