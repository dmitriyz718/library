const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  name: String,
  genre: String,
  languageID: String,
});
const Tutorial = new mongoose.model("Tutorial", TutorialSchema);
module.exports = Tutorial;
