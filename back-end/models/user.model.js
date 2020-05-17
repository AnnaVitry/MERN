const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: function(entry, cb) {
                setTimeout(function() {
                    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    var message = entry + ' is not a valid email address.';
                    cb(emailRegex.test(entry), message);
                }, 5);
            }
        },
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    followed: {
        type: Array,
        default: ''
    }
}, {
    timestamps: true,
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

const User = mongoose.model('User', userSchema);

module.exports = User;