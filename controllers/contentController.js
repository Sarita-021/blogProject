const Content = require("../models/content");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam...";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque...";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien...";
const blogContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...";

const content1 = new Content({
  id: 1,
  title: "blog 1",
  detail: blogContent,
});

const defaultContents = [content1];

exports.getHome = async (req, res) => {
  try {
    const isPost = await Content.find();
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
};

exports.getPost = async (req, res) => {
  try {
    const requestId = req.params.id;
    const foundContent = await Content.findOne({ _id: requestId });

    if (!foundContent) {
      res.render("post", {
        title: content1.title,
        content: content1.detail,
        postId: content1.id,
      });
    } else {
      res.render("post", {
        image: foundContent.image.url,
        title: foundContent.title,
        content: foundContent.detail,
        postId: foundContent._id,
      });
    }
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getEdit = (req, res) => {
  const postId = req.params.id;
  Content.findById(postId, (err, foundPost) => {
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
};

exports.updatePost = (req, res) => {
  const postId = req.params.id;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;

  Content.findByIdAndUpdate(
    postId,
    { title: updatedTitle, detail: updatedContent },
    (err, result) => {
      if (!err) {
        res.redirect("/");
      } else {
        console.log("Error updating post:", err);
        res.send("Error updating post.");
      }
    }
  );
};

exports.deletePost = (req, res) => {
  const postId = req.params.id;
  Content.findByIdAndDelete(postId, (err, deletedContent) => {
    if (!err) {
      res.redirect("/");
    } else {
      console.log("Error deleting post:", err);
      res.send("Error deleting the post.");
    }
  });
};

exports.getAbout = (req, res) => {
  res.render("about", { about: aboutContent });
};

exports.getContact = (req, res) => {
  res.render("contact", { contact: contactContent });
};

exports.getCompose = (req, res) => {
  res.render("compose");
};

exports.postCompose = async (req, res) => {
  const content = new Content({
    title: req.body.item,
    detail: req.body.postText,
    image: {
      url: req.file.path,
      filename: req.file.filename,
    },
  });
  await content.save();
  res.redirect("/");
};
