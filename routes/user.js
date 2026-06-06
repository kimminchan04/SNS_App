const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middleware");
const {follow, unfollow} = require("../controller/user"); 
router.post("/:id/follow", isLoggedIn, follow);
router.post("/:id/unfollow", isLoggedIn, unfollow); 
module.exports = router;