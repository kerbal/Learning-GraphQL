import uuid from 'uuid';
import { users } from "../sample resources/users";
import { posts } from "../sample resources/posts";
import { comments } from "../sample resources/comments";

const Mutation = {
  createUser: (parent, args, ctx, info) => {
    const {name, email, age} = args.data;
    const emailTaken = users.find(user => user.Email == email);
    if(emailTaken) {
      throw new Error('Email has already taken');
    }
    else {
      const newUser = {
        Id: uuid(),
        Name: name,
        Age: age
      };
      users.push(newUser);
      return newUser;
    }
  },
  createPost: (parent, args, ctx, info) => {
    const { Title, Body, Published, AuthorId } = args.data;
    const user = users.find(user => user.Id == AuthorId);
    if(!user) {
      throw new Error(`User with user id "${AuthorId}" not found!`);
    }
    else {
      const post = {
        Id: uuid(),
        Title,
        Body,
        Published,
        AuthorId
      }
      posts.push(post);
      return post;
    }
  },
  createComment: async (parent, args, { pubsub }, info) => {
    const { Content, UserId, PostId } = args.data;
    const user = users.find(user => user.Id == UserId);
    const post = posts.find(post => post.Id == PostId);
    if(!user) {
      throw new Error(`User with user id "${UserId}" not found!`);
    }
    if(!post) {
      throw new Error(`Post with post id "${PostId}" not found!`);
    }
    const comment = {
      Id: uuid(),
      Content, UserId, PostId
    };
    comments.push(comment);
    comment.Username = user.Name;
    pubsub.publish(`new comment ${PostId}`, { newComment: comment });
    return comment;
  }
};

export default Mutation;