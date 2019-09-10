import UserService from "../service/user.service";
import PostService from "../service/post.service";
import CommentService from "../service/comment.service";

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

  posts: async (parent, args, ctx, info) => {
    const posts = await PostService.getPosts(args.User_Id);
    return posts;
  },
  
  comments: async (parent, args, ctx, info) => {
    return await CommentService.getComments({
      Post_Id: args.Post_Id,
      User_Id: args.User_Id
    });
  }
};

export default Query;