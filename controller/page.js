const Post = require("../models/post");
const User = require("../models/user");
const Hashtag = require("../models/hashtag");
exports.renderProfile = (req, res, next) => {
    res.render("profile", {title: "My information"});
};
exports.renderJoin = (req, res, next) => {
    res.render("join", {title: "Join us"});
};
exports.renderMain = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: [{
                model: User,
                attributes: ["id", "nick"]
            }, {
                model: User,
                as: "Likers",
                attributes: ["id"]    
            }],
            order: [["createdAt", "DESC"]]
        })
        res.render("main", {title: "NodeBird", twits: posts});
    } catch (error) {
        console.error(error);
        next(error);
    }
};
exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {

        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({where: {title: query}});
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
                include: [{model: User, attributes: ["id", "nick"]}],
                order: [["createdAt", "DESC"]]
            });
        }
        res.render("main", {
            title: `${query} | NodeBird`,
            twits: posts
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}