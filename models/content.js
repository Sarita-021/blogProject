const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: String,
  detail: String,
  image: {
    url: String,
    filename: String,
  },
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
