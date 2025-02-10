const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');
const multer = require("multer");
const path = require("path");

const app = express();

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare...";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque...";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien...";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads"); // Save images in 'public/uploads'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", () => {
    console.log("Connected to MongoDB");
});

const contentSchema = new mongoose.Schema({
    title: String,
    detail: String,
    image: String // Store image file path
});

const Content = mongoose.model("Content", contentSchema);

app.get("/", function (req, res) {
    Content.find({}, function (err, foundContents) {
        if (foundContents.length === 0) {
            res.redirect("/");
        } else {
            res.render("home", { homeStarting: homeStartingContent, posts: foundContents });
        }
    });
});

app.get("/posts/:postName", function (req, res) {
    const requestTitle = _.lowerCase(req.params.postName);

    Content.findOne({ title: requestTitle }, function (err, foundContent) {
        if (!err) {
            if (foundContent) {
                res.render("post", {
                    title: foundContent.title,
                    content: foundContent.detail,
                    image: foundContent.image
                });
            } else {
                res.redirect("/");
            }
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

app.post("/compose", upload.single("image"), function (req, res) {
    const content = new Content({
        title: req.body.item,
        detail: req.body.postText,
        image: req.file ? "/uploads/" + req.file.filename : "" // Save image path if uploaded
    });

    content.save(function (err) {
        if (!err) {
            console.log("Successfully saved in DB");
            res.redirect("/");
        } else {
            console.log(err);
        }
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
