import UserService from "../service/user.service";
import CommentService from "../service/comment.service";

const Post = {
  Author: async (parent) => {
    const user = await UserService.getUser(parent.User_Id);
    return user;
  },
  Comments: async (parent) => {
    return await CommentService.getComments({
      Post_Id: parent.Id
    });
  }
};

export default Post;