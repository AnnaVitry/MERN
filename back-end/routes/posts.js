const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((request, response) =>{
    Post.find()
        .then(posts => response.json(posts))
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/add').post((request, response) => {
    const title = request.body.title;
    const content = request.body.content;
    const user_id = request.body.user_id;
    const user_name = request.body.user_name;
    const newPost = new Post({
        title,
        content,
        user_id,
        user_name
    });

    newPost.save()
           .then(() => response.json('Post added !'))
           .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/:id').get((request, response) => {
    Post.findById(request.params.id)
        .then(posts => response.json(posts))
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/:id').post((request, response) =>{
    Post.find({ $or: [ { user_id: { $in: request.body.followed } }, { user_id: request.params.id } ] })
        .sort([['updatedAt', 'descending']])
        .then(posts => {
            response.json(posts);
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/:id').delete((request, response) => {
    Post.findByIdAndDelete(request.params.id)
        .then(() => response.json('Post deleted.'))
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((request, response) => {
    Post.findById(request.params.id)
        .then(post => {
            post.title = request.body.title;
            post.content = request.body.content;
            post.user_id = request.body.user_id;

            post.save()
                .then(() => response.json('Post updated.'))
                .catch(err => response.status(400).json('Error: ' + err));
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/writer/:id').get((request, response) => {
    Post.find({ user_id: request.params.id })
        .sort([['updatedAt', 'descending']])
        .then(posts => {
            response.json(posts);
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

module.exports = router;