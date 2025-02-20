const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const helmet = require("helmet");
const methodOverride = require("method-override");
const contentRoutes = require("./routes/contentRoutes");

const app = express();

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(helmet());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "img-src 'self' data: https://picsum.photos *;");
  next();
});

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", () => {
  console.log("Connected to MongoDB");
});

app.use("/", contentRoutes);

app.listen(8080, function () {
  console.log("Server started on port 8080");
});
