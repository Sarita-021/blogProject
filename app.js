
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const blogContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ;
const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", () => {
  console.log("Connected to MongoDB");
});

const contentSchema = new mongoose.Schema({
    title : String , 
    detail : String
});

const Content = new mongoose.model("content", contentSchema);

const content1 = new Content ({
    title : "blog 1" , 
    detail : blogContent
})

const defaultContents = [content1];

app.get("/" , function(req , res){
    
    
    Content.find({}, function(err , foundContents){
        if (foundContents.length === 0 ){
            Content.insertMany(defaultContents , function(err){
                if (err) {
                    console.log(err);
                } else {
                    console.log("successfully saved in db")
                }
            });
            res.redirect("/");
        } else {
            console.log(foundContents)
            res.render("home" , {homeStarting : homeStartingContent,
                posts : foundContents })
        }
    })
});

app.get("/posts/:postName", function(req, res){
    
    const requestTitle = _.lowerCase(req.params.postName);
    console.log(requestTitle);

    Content.findOne({title: requestTitle}, function(err, foundContent){
        if (!err){
            if (!foundContent){
            //     // Create a new post
                const content = new Content({
                    title : content1.title,
                    content : content1.detail
                });
                content.save();
                res.redirect("/posts/" + requestTitle);
            } else {
                // Show an existing post
                
                res.render("post", {
                    title : foundContent.title,
                    content : foundContent.detail
                })
            }
        }
    });
});

app.get("/about" , function(req , res){
    res.render("about", {about : aboutContent });
});

app.get("/contact" , function(req , res){
    res.render("contact", {contact : contactContent });
});

app.get("/compose" , function(req , res ) {
    res.render("compose");
});

app.post("/compose", function(req , res){

    const content = new Content({
        title : req.body.item ,
        detail : req.body.postText
    });

    posts.push(content)

    Content.insertMany( posts , function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("successfully saved in db")
        }
    });
    res.redirect("/");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
