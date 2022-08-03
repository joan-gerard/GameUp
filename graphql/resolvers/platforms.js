const Platform = require("../../models/Platform");

module.exports = {
  Query: {
    async getPlatforms() {
      try {
        const platforms = await Platform.find();
        return platforms;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPlatform(_, { name }, context) {

      if (name.trim() === "") {
        throw new Error("Add a name");
      }

      const newPlatform = new Platform({
        name,
      });

      const platform = await newPlatform.save();
      return platform;
    },
  },
};
