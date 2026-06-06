const express = require("express");
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require("../middleware");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const {afterUploadImage, uploadPost} = require("../controller/post");
const {like, unlike} = require("../controller/post");
try {
    fs.readdirSync("uploads");
} catch(error) {
    fs.mkdirSync("uploads");
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
        },
        filename(req, file, cb) {
            console.log(file);
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024}
});
router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);
router.post("/:id/like", isLoggedIn, like);
router.delete("/:id/like", isLoggedIn, unlike);
module.exports = router;