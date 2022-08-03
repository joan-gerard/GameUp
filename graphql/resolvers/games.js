const Game = require("../../models/Game");

module.exports = {
  Query: {
    async getGames() {
      try {
        const games = await Game.find();
        return games;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createGame(_, { name, releaseDate, platform }, context) {


      const newGame = new Game({
        name,
        releaseDate,
        platform
      });

      const game = await newGame.save();
      return game;
    },
  },
};
