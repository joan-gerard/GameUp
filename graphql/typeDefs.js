const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    game: String!
    comments: [Comment]!
    likes: [Like]!
    # likeCount: Int!
    # commentCount: Int!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Platform {
    id: ID!
    name: String!
  }

  type Game {
    id: ID!
    name: String!
    releaseDate: String!
    platform: Platform
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUsers: [User]
    getPlatforms: [Platform]
    getGames: [Game]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!, game: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    createPlatform(name: String!): Platform!
    createGame(name: String!, releaseDate: String, platform: String): Game!
    deleteUser(userId: String!): String!
  }
`;
