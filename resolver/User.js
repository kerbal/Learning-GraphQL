import { posts } from "../sample resources/posts";
import { comments } from "../sample resources/comments";

const User = {
  Posts: (parent) => {
    return posts.filter(post => post.AuthorId == parent.Id)
  },
  Comments: (parent) => {
    return comments.filter(comment => comment.UserId == parent.Id)
  }
};

export default User;