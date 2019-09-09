import User from "../schema/User.model";
import Post from "../schema/Post.model";

export default class PostService {
  static async getPosts(parent, args, ctx, info) {
    try {
      const query = {
        where: {
          Published: true,
          Status: true
        },
        include: [
          {
            model: User
          }
        ]
      }

      const posts = await Post.findAll(query);
      return posts;
    }
    catch (error) {
      console.log(error.message);
      return [];
    }
  }
}