const { model, Schema } = require("mongoose");

const PlatformSchema = new Schema({
  name: String,
});

module.exports = model('Platform', PlatformSchema);
