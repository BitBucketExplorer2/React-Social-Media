const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

/**
 * Add A Post
 */
router.post("/", async (req, res) => {

    const newPost = await new Post(req.body);

    try {

        const savedPost = await newPost.save();
        res.status(200).json(savedPost)

    } catch (err) {
        console.log("009")
        return res.status(500).json(err)
    }
})
/**
 * Update  Post
 */
router.put('/:id', async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            try {
                // const updatedPost = await Post.findByIdAndUpdate(req.params.id);
                const updatedPost = await post.updateOne({ $set: req.body });
                res.status(200).json(updatedPost)

            } catch (err) {
                console.log("0009");
                return res.status(500).json(err)
            }
        } else {
            return res.status(403).json("You Can Update Only Your Post !")
        }

    } catch (err) {
        return res.status(500).json(err)
    }
})

/**
 * Delete  Post
 */
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.body.userId === post.userId) {
            //await Post.findByIdAndDelete(req.params.id);
            await post.deleteOne();
            res.status(200).json("Post Deleted SuccessFully !!")
        } else {
            return res.status(403).json("You Can Delete Only Your Post Only !")
        }
    } catch (err) {
        console.log("Final Error")
        return res.status(500).json(err);
    }
})
/**
 * Like/DisLike Post
 */
router.put('/:id/like', async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {

            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json(`You Liked - ${post.userId}`)
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json(`You DisLiked - ${post.userId}`)
        }

    } catch (err) {
        return res.status(500).json(err)
    }
})

/**
 * Get A Post
 */
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    } catch (err) {
        console.log("Final Error")
        return res.status(500).json(err)
    }
})
/**
 * Get All Post bY Admin
 */
router.get("/", async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);

    } catch (err) {
        console.log("Final Error")
        return res.status(500).json(err)
    }
})

/**
 * Get user's all post
 */
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);

    } catch (err) {
        console.log("Final Error")
        return res.status(500).json(err)
    }
})

/**
 * Get TimeLine Post
 */
router.get("/timeline/:userId", async (req, res) => {
    let postArray = [];
    try {
        const currentUser = await User.findById(req.params.userId);

        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts));

    } catch (err) {
        console.log("Final Error")
        return res.status(500).json(err)
    }
})
module.exports = router