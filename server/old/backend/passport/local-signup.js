var passport = require('passport'),
  User = require('mongoose').model('User'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  (username, password, done) => {

    const userData = {
      username: username,
      password: password
    };

    const newUser = new User(userData);
    newUser.save((err) => {
      if (err) {
        return done(err);
      }

      return done(null);
    });
  }
));
