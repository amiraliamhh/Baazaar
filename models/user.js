const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    if (user.hashedPassword) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next(err);
            });
        });
    }
});

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImagePath: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('User', UserSchema);