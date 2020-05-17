const router = require('express').Router();
const sha1 = require('sha1');
const User = require('../models/user.model');
let UserSession = require('../models/userSession.model');

router.route('/').get((request, response) =>{
    User.find()
        .then(users => response.json(users))
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/add').post((request, response) => {

    const username = request.body.username;
    const email = request.body.email;
    const password = request.body.password;
    const isAdmin = request.body.isAdmin;

    User.find({ email: email }, (err, previousUsers) => {
        if (err) throw err;
        if (previousUsers.length > 0) {
            return response.json({token: ''});
        };
    });
    User.find({ username: username }, (err, previousUsers) => {
        if (err) throw err;
        if (previousUsers.length > 0) {
            return response.json({token: ''});
        };
    });

    const newUser = new User({username, email, password, isAdmin});
    newUser.save()
           .then((prod) => {
                const userSession = new UserSession({userId: prod._id});
                userSession.save()
                           .then(() => response.json( {token: prod._id} ))
                           .catch(err => response.status(400).json('Error: ' + err));
           })
           .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/:id').get((request, response) => {
    User.findById(request.params.id)
        .then(user => response.json(user))
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/:id').delete((request, response) => {
    User.findByIdAndDelete(request.params.id)
        .then(() => response.json('User deleted.'))
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((request, response) => {
    User.findById(request.params.id)
        .then(user => {
            user.username = request.body.username;
            user.email = request.body.email;
            user.password = request.body.password;
            user.isAdmin = request.body.isAdmin;
            user.save()
                .then(() => response.json('User updated.'))
                .catch(err => response.status(400).json('Error: ' + err));
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/following/:id').post((request, response) => {
    User.find({ _id : { $in: request.body.followed } }) 
        .then(users => {
            response.json(users);
        })
        .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/login').post((request, response) => {

        const username = request.body.username;
        const password = request.body.password;

    User.findOne({ username, password }, (err, existUser) => {
        if (err) throw err;
        if (existUser !== null) {
            const userSession = new UserSession({userId: existUser._id});
            userSession.save()
                       .then(() => response.json( {token: existUser._id} ))
                       .catch(err => response.status(400).json('Error: ' + err));
        } else {
            response.json( { token: '' } )
        }
    })
    .catch(err => response.status(400).json('Error: ' + err));
});

router.route('/logout/:id').delete((request, response) => {
    UserSession.findOneAndDelete({userId: request.params.id})
    .then(() => response.json('Post deleted.'))
    .catch(err => response.status(400).json('Error: ' + err));
});

module.exports = router;