const Post = require("../models/post");
const Hashtag = require("../models/hashtag");
exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({url: `img/${req.file.filename}`});
}
exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id
        });
        /* await post.addUser(req.user.id); */
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => {

                return Hashtag.findOrCreate({
                    where: {title: tag.slice(1).toLowerCase()}
                });
            }));
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
}
exports.like = async (req, res, next) => {
    try {
        const post = await Post.findOne({where: {id: req.params.id}});
        if (post) {
            await post.addLikers(req.user.id);
            res.send("success");
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}
exports.unlike = async (req, res, next) => {
    try {
        const post = await Post.findOne({where: {id: req.params.id}});
        if (post) {
            await post.removeLikers(req.user.id);
            res.send("success");
        } else {
            res.status(404).send("Post not found");
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}