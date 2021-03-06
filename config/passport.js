var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
//first configuration tells passport how to store user in session
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  })
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  //tries to find the user if they exist
    User.findOne({'email': email}, function(err, user){
      if(err){
        return done(err);
      }
      if(user){
        return done(null, false, {message: "Email is already in use."});
      }
      //if the input passes all of the checks for errors
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password); //need to encrypt password
      newUser.save(function(err, result){
        if(err){
          return done(err);
        }
        return done(null, newUser);
      });
    });
}));
