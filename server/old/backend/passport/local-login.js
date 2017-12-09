const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../config');
const passport = require('passport');



passport.use( new LocalStrategy({
  (username, password, done) => {
  const userData = {
    username: username.trim(),
    password: password.trim()
  };

  // find a user by username address
  return User.findOne({ username: userData.username }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      const error = new Error('Incorrect username or password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id
      };

      // create a token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        username: user.username
      };

      return done(null, token, data);
    });
  });
}));
