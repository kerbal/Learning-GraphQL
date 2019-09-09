import { comments } from "../sample resources/comments";
import UserService from "../service/user.service";
import PostService from "../service/post.service";

const Query = {
  users: async (parent, args, ctx, info) => {
    const users = await UserService.getUsers({
      Name: args.Name
    });
    return users;
  },

  user: async (parent, args, ctx, info) => {
    const user = await UserService.getUser(args.Id);
    if(user) {
      return user;
    }
    else {
      throw new Error(`User with Id '${id}' not found!`);
    }
  },

  posts: PostService.getPosts,
  
  comments: () => {
    return comments
  }
};

export default Query;