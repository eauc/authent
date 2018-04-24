"use strict";

const passport = require("passport");
const {Strategy, ExtractJwt} = require("passport-jwt");
const {models: {Users}} = require("./db");

const jwtSecret = "mysecret";

const params = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new Strategy(params, (payload, done) => {
  Users.findById(payload.id)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      return done(null, {
        id: user.id,
        email: user.email
      });
    })
    .catch((error) => {
      done(error, null);
    });
});

passport.use(strategy);

module.exports = {
  middleware: passport.initialize(),
  jwtSecret,
  authenticate: passport.authenticate("jwt", {session: false}),
};
