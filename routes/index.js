var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var passport = require('passport');

//var csrf = require('csurf');

//var csrfProtection = csrf();
//router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: docs});
  });
});

router.get('/user/signup', function(req, res, next){
  //res.render('user/signup', {csrfToken: req.csrfToken()});
  res.render('user/signup');
});

router.post('/user/signup', passport.authenticate('local.signup',{
  successRedirect: 'user/profile',
  failureRedirct: '/signup',
  failureFlash: true //flashes a message notifiying the user that the signup failed
}));
router.get('/profile', function(req, res, next){
  res.render('/profile');
});
module.exports = router;
