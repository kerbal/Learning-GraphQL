import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from "./resolver";
import { sequelize } from "./config/sequelize";
import User from "./schema/User.model";
import Post from "./schema/Post.model";
import Comment from "./schema/Comment.model";

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: './schema/schema.graphql',
  resolvers,
  context: {
    pubsub
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.query(`
  SELECT "setting"
  FROM pg_settings
  WHERE name = 'port';
`).then(([result]) => {
  console.log(result);
});

server.start(() => {
  sequelize.sync({}).then(async () => {
    require('./config/sequelizeAssociation');
  })
  console.log("Server is up on port 4000!");
});