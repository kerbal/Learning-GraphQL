import User from "../schema/User.model";
import Post from "../schema/Post.model";
import Comment from "../schema/Comment.model";

User.hasMany(Post, {
  foreignKey: 'User_Id'
});

User.hasMany(Comment, {
  foreignKey: 'User_Id'
});

Post.hasMany(Comment, {
  foreignKey: 'Post_Id'
});

Post.belongsTo(User, {
  targetKey: 'Id',
  foreignKey: 'User_Id'
});

Comment.belongsTo(User, {
  targetKey: 'Id',
  foreignKey: 'User_Id'
});