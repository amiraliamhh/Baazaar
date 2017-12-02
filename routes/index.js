const express         = require('express');
const router          = express.Router();
const User            = require('../models/user')
const passport        = require('passport');
const passportConfig  = require('../config/passport');
const flash           = require('express-flash');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {isAuth: false, message: 'Welcome to Baazaar.'});
});

router.route('/signup')
  .get((req, res, next) => {
    res.render('signup', {});
  })
  .post((req, res, next) => {
    User.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        console.log('Error accured: ' + err);
        return res.redirect('/login');
      } else {
        let user      = new User();
        user.name     = req.body.fullName;
        user.email    = req.body.email;
        user.hashedPassword = req.body.password;
        user.save(function(err) {
          if (err) return next(err);
          req.logIn(user, function(err) {
            if (err) return next(err);
            res.redirect('/');
          });
        });
      }
    });
  });

router.route('/login')
  .get((req, res, next) => {
    if (req.user) return res.redirect('/');
    res.render('login', {}); 
  })
  .post(passport.authenticate('local-login',  {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

router.get('/profile', passportConfig.isAuthenticated, (req, res, next) => {
  res.render('profile', {})
});

router.get('/products', (req, res, next) => {
  res.render('products', {});
});

module.exports = router;
