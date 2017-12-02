const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const config = require('./secret');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });    
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if (err)
            return done(err);

        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user with that credentials!'));

        return done(null, user);
    })
}));

exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}