const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');
const multer  = require('multer');
const {storage}=require("./public/js/cloudConfig.js");
const upload = multer({ storage:storage });

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam...";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque...";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien...";
const blogContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
const app = express();

let posts = [];

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.static("public"));

const helmet = require('helmet');
app.use(helmet());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", () => {
  console.log("Connected to MongoDB");
});

const contentSchema = new mongoose.Schema({
  title: String,
  detail: String,
  image:{
    url:String,
    filename:String,
  }
});

const Content = new mongoose.model("Content", contentSchema);

const content1 = new Content({
  title: "blog 1",
  detail: blogContent
});

const defaultContents = [content1];

app.get("/", function (req, res) {
  Content.find({}, function (err, foundContents) {
    if (foundContents.length === 0) {
      Content.insertMany(defaultContents, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved in DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("home", {
        homeStarting: homeStartingContent,
        posts: foundContents
      });
    }
  });
});

app.get("/posts/:postName", function(req, res){
    const requestTitle = _.lowerCase(req.params.postName);
    console.log(requestTitle);

  Content.findOne({ title: new RegExp("^" + requestTitle + "$", "i") }, function (err, foundContent) {
    if (!err) {
      if (!foundContent) {
        const content = new Content({
          title: content1.title,
          detail: content1.detail
        });
        content.save();
        res.redirect("/posts/" + requestTitle);
      } else {
        res.render("post", {
          title: foundContent.title,
          content: foundContent.detail,
          postId: foundContent._id 
        });
      }
    }
  });
});

//  Delete Route
app.delete("/delete/:id", function (req, res) {
    const postId = req.params.id;
    console.log("Attempting to delete post with ID:", postId);

    Content.findByIdAndDelete(postId, function (err, deletedContent) {
        if (!err) {
            if (deletedContent) {
                console.log("Successfully deleted post:", deletedContent);
                res.redirect("/");
            } else {
                console.log("Post not found with ID:", postId);
                res.redirect("/");
            }
        } else {
            console.log("Error deleting post:", err);
            res.send("Error deleting the post.");
        }
    });
});


app.get("/about" , function(req , res){
    res.render("about", {about : aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose",upload.single("uploaded-file"), function (req, res) {
  const content = new Content({
    title: req.body.item,
    detail: req.body.postText,
  });
  content.image.url=req.file.path;
  content.image.filename=req.file.filename;
  posts.push(content);

  Content.insertMany(posts, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved in DB");
    }
  });
  res.redirect("/");
});

app.listen(8080, function () {
  console.log("Server started on port 8080");
});
