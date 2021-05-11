const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../Schemas/UserSchema');

// module.exports = function(passport) {
//   passport.use(new BearerStrategy(
//     function(token, done) {
//       User.findOne({ token: token }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         return done(null, user, { scope: 'read' });
//       });
//     }
//   ));
// };


class Strategy {
  async init (passport) {
    passport.use(new BearerStrategy(
      function(token, done) {
        User.findOne({ token: token }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user, { scope: 'read' });
        });
      }
    ));
  }
}

module.exports = Strategy;