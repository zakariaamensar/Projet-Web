const passport = require("passport");
//
module.exports.login = async (req, res, next) => {
  //
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.send(false);
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send(true);
    });
  })(req, res, next);
};
