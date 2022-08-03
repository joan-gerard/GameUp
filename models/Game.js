const { model, Schema } = require("mongoose");

const GameSchema = new Schema({
  name: String,
  releaseDate: String,
  platform: String
});

module.exports = model("Game", GameSchema);
