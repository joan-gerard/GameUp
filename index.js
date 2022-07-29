const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const gql = require("graphql-tag");

const { MONGODB } = require("./config.js");
const mongoose = require("mongoose");
const Post = require("./models/Post");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log(`MongoDB Connected`);
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
