module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("OOPS you don't have the access for that");
    res.send(false);
  } else {
    next();
  }
};
