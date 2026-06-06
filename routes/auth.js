const express = require("express");
const passport = require("passport");
const {isLoggedIn, isNotLoggedIn} = require("../middleware");
const {join, login, logout} = require("../controller/auth");
const router = express.Router();
router.post("/join", isNotLoggedIn, join);
router.post("/login", isNotLoggedIn, login);
router.get("/logout", isLoggedIn, logout);
router.get("/kakao", passport.authenticate("kakao"));
router.get("/kakao/callback", passport.authenticate("kakao", {
    failureRedirect: "/?loginError=kakao login is failed",
}), (req, res) => {
    res.redirect('/');
});
module.exports = router;