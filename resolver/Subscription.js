import { posts } from "../sample resources/posts";

const Subscription = {
  count: {
    subscribe: (parent, args, { pubsub }, info) => {
      let count = 0;
  
      setInterval(() => {
        count++;
        pubsub.publish('count', {
          count
        });
      });

      return pubsub.asyncIterator('count');
    }
  },

  newComment: {
    subscribe: (parent, args, { pubsub }, info) => {
      const postId = args.id;
      const post = posts.find(post => post.Id == postId);
      if(!post) {
        throw new Error(`Post with ID '${postId}' not found!`);
      }
      return pubsub.asyncIterator(`new comment ${postId}`);
    }
  }
}

export default Subscription;