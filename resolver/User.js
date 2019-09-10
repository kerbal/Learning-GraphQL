import PostService from "../service/post.service";
import CommentService from "../service/comment.service";

const User = {
  Posts: async (parent) => {
    return await PostService.getPosts(parent.Id);
  },
  Comments: async (parent) => {
    return await CommentService.getComments({
      User_Id: parent.Id
    });
  }
};

export default User;