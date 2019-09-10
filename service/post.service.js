import User from "../schema/User.model";
import Post from "../schema/Post.model";
import { sequelize, Sequelize } from "../config/sequelize";
import ObjectService from "./object.service";

export default class PostService {
  static async getPosts(User_Id) {
    try {
      const query = {
        where: {
          Published: true,
          Status: true
        }
      }

      if(User_Id) {
        query.where.User_Id = User_Id;
      }

      const posts = await Post.findAll(query);
      return posts;
    }
    catch (error) {
      console.log(error.message);
      return [];
    }
  }

  static async createPost(info) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });
    try {
      const post = await Post.create({
        ...info,
        Status: true
      }, {
        transaction: t
      });
      
      await t.commit();

      return post;
    }
    catch (error) {
      await t.rollback();
      throw new Error(error.message);
    }
  }

  static async getPost(Id) {
    try {
      const post = await Post.findOne({
        where: {
          Id,
          Status: true
        }
      });

      return post;
    }
    catch (error) {
      return null;
    }
  }

  static async editPost(info) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      const { Id } = info;
      ObjectService.deleteProp(info, ['User_Id', 'Status']);
      const post = await Post.update({
        Title: info.Title
      }, {
        where: {
          Id
        },
        transaction: t
      }).then((result) => {
        console.log(result);
        return post;
      });
      await t.commit();
      return post;
    }
    catch (error) {
      await t.rollback();
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  static async deletePost (Id) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      const post = await Post.update({
        Status: false
      }, {
        where: {
          Id
        },
        transaction: t
      });

      await t.commit();
      return post;
    }
    catch (error) {
      await  t.rollback();
      console.log(error.message);
      throw new Error(error.message);
    }
  }
}