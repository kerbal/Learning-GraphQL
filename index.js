import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from "./resolver";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './schema/schema.graphql',
  resolvers,
  context: {
    pubsub
  }
});

server.start(() => {
  console.log("Server is up on port 4000!");
});