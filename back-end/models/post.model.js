const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: false},
    content: {type: String, required: true},
    user_id: {type: String} ,    //, required: true}
    user_name: {type: String}
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;