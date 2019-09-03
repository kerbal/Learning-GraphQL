import { users } from "../sample resources/users";
import { comments } from "../sample resources/comments";

const Post = {
  Author: (parent) => {
    return users.find(user => user.Id == parent.AuthorId);
  },
  Comments: (parent) => {
    return comments.filter(comment => comment.PostId == parent.Id)
  }
};

export default Post;