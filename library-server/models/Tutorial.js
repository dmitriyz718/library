const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
  name: String,
  genre: String,
  languageID: String,
});
const Tutorial = new mongoose.model("Tutorial", TutorialSchema);
module.exports = Tutorial;
