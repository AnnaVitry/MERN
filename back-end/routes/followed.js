const router = require('express').Router();
const sha1 = require('sha1');
const User = require('../models/user.model');
let UserSession = require('../models/userSession.model');
const mongodb = require('mongodb');

router.route('/:id').post((request, response) => {
    User.findById(request.params.id)
        .then(user => {
            user.followed = request.body.followed;
            user.save()
                .then((data) => response.send(data.followed))
                .catch(err => response.status(400).json('Error: ' + err));
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/:id').get((request, response) => {
    User.findOne(mongodb.ObjectId(request.params.id))
        .then(user => response.json(user))
        .catch(err => response.status(400).json('Error: ' + err));
});

module.exports = router;