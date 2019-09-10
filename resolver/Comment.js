import UserService from "../service/user.service";

const Comment = {
  Author: async (parent) => {
    return await UserService.getUser(parent.User_Id);
  }
};

export default Comment;