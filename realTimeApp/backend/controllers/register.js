const User = require("../models/user");

module.exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, gmail } = req.body;

    const user = new User({
      username,
      gmail,
    });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) res.send(false);
      else res.send(true);
    });
  } catch (err) {
    console.err(err);
    res.send(false);
  }
};
