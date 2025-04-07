const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      console.error(err);
      return done(err, false);
    }
  })
);

module.exports = passport;
