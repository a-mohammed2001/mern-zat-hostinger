const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        img: String,
        date: {type : Date , default : Date.now()},
        isUpdated:Boolean
    }
);
const Blog = mongoose.model("blogs",blogSchema);
module.exports = Blog;
