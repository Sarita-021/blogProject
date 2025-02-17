const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const helmet = require("helmet");
const methodOverride = require("method-override");

const app = express();

let posts = [];
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam...";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque...";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien...";
const blogContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";

app.use(methodOverride("_method"));

app.use(express.static("public"));

app.use(helmet());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://ayanangshudutta1:1tnbPzSiHItnLIdi@playground.pmqip.mongodb.net/?retryWrites=true&w=majority&appName=Playground",
  () => {
    console.log("Connected to MongoDB");
  }
);

const contentSchema = new mongoose.Schema({
  title: String,
  detail: String,
});

const Content = new mongoose.model("content", contentSchema);

const content1 = new Content({
  id: 1,
  title: "blog 1",
  detail: blogContent,
});

const defaultContents = [content1];

app.get("/", async function (req, res) {
  try {
    isPost = await Content.find();
    console.log(isPost);
    if (isPost.length === 0) {
      res.render("home", {
        homeStarting: "This is a default blog",
        posts: defaultContents,
      });
    } else {
      res.render("home", {
        homeStarting: homeStartingContent,
        posts: isPost,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const requestId = req.params.id;
    // console.log("/posts/:id", requestId);

    // Find post by id
    const foundContent = await Content.findOne({ _id: requestId });

    if (!foundContent) {
      res.render("post", {
        title: content1.title,
        content: content1.detail,
        postId: content1.id,
      });
    } else {
      // Render the found post
      res.render("post", {
        title: foundContent.title,
        content: foundContent.detail,
        postId: foundContent._id,
      });
    }
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Edit Route

app.get("/edit/:id", function (req, res) {
  const postId = req.params.id;
  console.log("Editing Post ID:", postId);

  Content.findById(postId, function (err, foundPost) {
    if (!err) {
      if (foundPost) {
        res.render("edit", {
          title: foundPost.title,
          content: foundPost.detail,
          postId: foundPost._id,
        });
      } else {
        res.send("Post not found!");
      }
    } else {
      console.log("Error fetching post for edit:", err);
      res.send("Error fetching post.");
    }
  });
});

app.put("/update/:id", function (req, res) {
  const postId = req.params.id;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;

  console.log("Updating Post ID:", postId);
  console.log("New Title:", updatedTitle);
  console.log("New Content:", updatedContent);

  Content.findByIdAndUpdate(
    postId,
    { title: updatedTitle, detail: updatedContent },
    function (err, result) {
      if (!err) {
        console.log("Successfully updated:", result);
        res.redirect("/posts/" + postId);
      } else {
        console.log("Error updating post:", err);
        res.send("Error updating post.");
      }
    }
  );
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

app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", async function (req, res) {
  const content = new Content({
    title: req.body.item,
    detail: req.body.postText,
  });

  posts.push(content);
  await content.save();
  Content.insertMany(posts, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved in DB");
    }
  });
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
