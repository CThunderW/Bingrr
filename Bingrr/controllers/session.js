const User = require("../models/user");
const validator = require("validator");

module.exports = {
  // new(req, res) {
  //   res.render("session/new");
  // },
  async create(req, res, next) {
    const { userName, password } = req.body;
    console.log(typeof req.body);
    console.log(req.body);
    console.log("session: " + userName);
    console.log("session: " + password);
    try {
      let user;
      if (validator.isEmail(userName)) {
        user = await User.find("email", userName);
      } else {
        user = await User.find("userName", userName);
      }
      console.log("foundUser: ", user);
      if (user) {
        req.session.userId = user.id;
        req.session.save();
        const { id, email, userName } = user;
        const currentUser = { id, email, userName };
        console.log("line 25: ", req.session);
        console.log("currentUser27: ", currentUser);
        res.json(currentUser);
      } else {
        res.json({ error: "invalid credentials" });
      }
    } catch (err) {
      next(err);
    }
  },
  destroy(req, res) {
    req.session.userID = undefined;
    res.json({});
  }
};

//       const user = await User.findByEmail(username);

//       if (user && (await user.authenticate(password))) {
//         req.session.userId = user.id;

//         // req.flash("success", `Welcome back, ${user.userName}!`);
//         res.redirect("/main");
//       } else {
//         // req.flash("danger", "Invalid Email or Password");
//         res.render("session/new");
//       }
//     } catch (error) {
//       next(error);
//     }
//   },
//   destroy(req, res) {
//     req.session.userId = undefined;

//     res.redirect("/");
//   }
// };
