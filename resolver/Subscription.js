import { posts } from "../sample resources/posts";

const Subscription = {
  comment: {
    subscribe: (parent, args, { pubsub }, info) => {
      const postId = args.id;
      const post = posts.find(post => post.Id == postId);
      if(!post) {
        throw new Error(`Post with ID '${postId}' not found!`);
      }
      return pubsub.asyncIterator(`comment ${postId}`);
    }
  },

  post: {
    subscribe: (parent, args, { pubsub }, info) => {
      return pubsub.asyncIterator('post');
    }
  }
}

export default Subscription;