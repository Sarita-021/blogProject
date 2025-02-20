const express = require("express");
const multer = require("multer");
const { storage } = require("../public/js/cloudConfig.js");
const upload = multer({ storage: storage });
const contentController = require("../controllers/contentController");

const router = express.Router();

router.get("/", contentController.getHome);
router.get("/posts/:id", contentController.getPost);
router.get("/edit/:id", contentController.getEdit);
router.put("/update/:id", contentController.updatePost);
router.delete("/delete/:id", contentController.deletePost);
router.get("/about", contentController.getAbout);
router.get("/contact", contentController.getContact);
router.get("/compose", contentController.getCompose);
router.post("/compose", upload.single("uploaded-file"), contentController.postCompose);

module.exports = router;
