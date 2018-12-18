const User = require("../models/user");

module.exports = {
  new(req, res) {
    res.render("users/new");
  },
  current(req, res, next) {
    if (req.currentUser) {
      const { id, email, userName } = req.currentUser;
      const currentUser = { id, email, userName };

      res.json(currentUser);
    } else {
      res.json({});
    }
  },

  async create(req, res, next) {
    const { userName, firstName, lastName, email, password } = req.body;
    try {
      const user = new User({ userName, firstName, lastName, email, password });
      await user.save();
      req.session.userId = user.id;
      const { id } = user;
      const createdUser = { id, email, userName };
      console.log("line 26: ", createdUser);
      res.json(createdUser);
    } catch (error) {
      next(error);
    }
  }
};
