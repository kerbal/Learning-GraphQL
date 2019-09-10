import UserService from '../service/user.service';
import PostService from '../service/post.service';
import CommentService from '../service/comment.service';

const Mutation = {
  createUser: async (parent, args, ctx, info) => {
    const user = await UserService.createUser(args.data);
    return user;
  },

  createPost: async (parent, args, { pubsub }, info) => {
    const post = await PostService.createPost(args.data);
    return post;
  },

  updatePost: async (parent, args, { pubsub }, info) => {
    await PostService.editPost(args.data);
    return await PostService.getPost(args.data.Id);
  },

  deletePost: async (parent, args, { pubsub }, info) => {
    const post = await PostService.getPost(args.data.Id);
    await PostService.deletePost(args.Id);
    return post;
  },

  createComment: async (parent, args, { pubsub }, info) => {
    const comment = await CommentService.createComment(args.data);
    return comment;
  },

  updateComment: async (parent, args, { pubsub }, info) => {
    await CommentService.editComment(args.data);
    return await CommentService.getComment(args.data.Id);
  },

  deleteComment: async (parent, args, { pubsub }, info) => {
    const comment = await CommentService.getComment(args.data.Id);
    await CommentService.deleteComment(args.Id);
    return comment;
  }
};

export default Mutation;