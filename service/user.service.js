import User from "../schema/User.model";
import { sequelize, Sequelize } from "../config/sequelize";

export default class UserService {
  static async getUsers (option) {
    try {
      const users = await User.findAll({
        where: {
          Name: {
            $like: `%${option.Name == undefined ? '' : option.Name}%`
          },
          Status: true
        }
      });
      return users;
    }
    catch (error) {
      console.log(error.message);
      return [];
    }
  }

  static async getUser (Id) {
    try {
      const user = await User.findOne({
        where: {
          Id,
          Status: true
        }
      });
      return user;
    }
    catch (error) {
      console.log(error.message);
      return null;
    }
  }

  static async createUser (info) {
    const t = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      let user = await User.findOne({
        where: {
          Username: info.Username,
          Status: true
        }
      });

      if(user) {
        throw new Error(`User with username ${info.Username} has existed!`);
      }

      console.log(info);

      user = await User.create({
        ...info,
        Status: true
      });
      await t.commit();
      return user;
    }
    catch (error) {
      await t.rollback();
      throw error;
    }
  }
}