import PostService from "../service/post.service";
import CommentService from "../service/comment.service";

const User = {
  Posts: async (parent) => {
    return await PostService.getPosts(parent.User_Id);
  },
  Comments: async (parent) => {
    return await CommentService.getComments({
      User_Id: parent.User_Id
    });
  }
};

export default User;