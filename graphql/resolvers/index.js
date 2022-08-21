const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const platformsResolvers = require("./platforms");
const gamesResolvers = require("./games");

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
    ...platformsResolvers.Query,
    ...gamesResolvers.Query,
    
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...platformsResolvers.Mutation,
    ...gamesResolvers.Mutation,
  },
};
