const Post = require('../models/Post');

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content, authorId: req.user });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

// Get all posts or posts by a specific author
const getPosts = async (req, res) => {
    try {
        const authorId = req.query.author;
        let posts;
        if (authorId) {
            posts = await Post.find({ authorId }).sort({ createdAt: -1 }).populate('authorId', 'email');
        } else {
            posts = await Post.find().sort({ createdAt: -1 }).populate('authorId', 'email');
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

module.exports = { createPost, getPosts };
