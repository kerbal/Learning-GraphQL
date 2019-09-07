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

  createPost: (parent, args, { pubsub }, info) => {
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
      if(post.Published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATE',
            data: post
          }
        });
      }
      return post;
    }
  },

  updatePost: (parent, args, { pubsub }, info) => {
    const post = posts.find(post => post.Id == args.data.Id);
    const originalPost = JSON.parse(JSON.stringify(post));
    if(!post) {
      throw new Error('Post not found');
    }
    for(const prop in args.data) {
      post[prop] = args.data[prop];
    }
    if(!originalPost.Published && post.Published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATE',
          data: post
        }
      });
    }
    else if(originalPost.Published && !post.Published) {
      pubsub.publish('post', {
        post: {
          mutation: 'DELETE',
          data: post
        }
      });
    }
    else {
      if(post.Published) {
        pubsub.publish('post', {
          post: {
            mutation: 'UPDATE',
            data: post
          }
        });
      }
    }
    return post;
  },

  deletePost: (parent, args, { pubsub }, info) => {
    const { Id } = args;
    const [post] = posts.splice(posts.findIndex(post => post.Id == Id), 1);
    if(!post) {
      throw new Error('Post not found');
    }
    pubsub.publish('post', {
      post: {
        mutation: 'DELETE',
        data: post
      }
    });
    return post;
  },

  createComment: (parent, args, { pubsub }, info) => {
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
    pubsub.publish(`comment ${PostId}`, { newComment: comment });
    return comment;
  },

  updateComment: (parent, args, { pubsub }, info) => {
    const { Id, Content} = args.data;
    const comment = comments.find(comment => comment.Id == Id);
    if(!comment) {
      throw new Error(`comment with Id '${Id}'`);
    }
    comment.Content = Content;
    pubsub.publish(`comment ${comment.PostId}`, {
      comment: {
        mutation: 'UPDATE',
        data: comment
      }
    });
    return comment;
  },

  deleteComment: (parent, args, { pubsub }, info) => {
    const { Id } = args;
    const [comment] = comments.splice(comments.findIndex(comment => comment.Id == Id), 1);
    pubsub.publish('comment', {
      comment: {
        mutation: 'DELETE',
        data: comment
      }
    });
    return comment;
  }
};

export default Mutation;