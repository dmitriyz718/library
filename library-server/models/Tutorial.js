const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  name: String,
});
const Language = new mongoose.model("Language", LanguageSchema);
module.exports = Language;
