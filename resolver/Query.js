import { users } from "../sample resources/users";
import { posts } from "../sample resources/posts";
import { comments } from "../sample resources/comments";

const Query = {
  me: () => users[0],
  post: () => posts[0],
  users: (parent, args, ctx, info) => {
    if(!args.name) {
      return users;
    }
    else {
      return users.filter(user => user.Name.toLocaleLowerCase().includes(args.name.toLocaleLowerCase()));
    }
  },
  posts: () => {
    return posts.filter(post => post.Published);
  },
  comments: () => {
    return comments
  }
};

export default Query;