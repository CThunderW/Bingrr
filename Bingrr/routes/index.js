const express = require("express");
// var cache = require("express-redis-cache")({
//   host: "http://localhost",
//   port: 3333
// });
const cache = require("express-redis-cache")();
const router = express.Router();
const welcomeController = require("../controllers/welcome");
const sessionController = require("../controllers/session");
const usersController = require("../controllers/users");
const mainController = require("../controllers/main");
const guestController = require("../controllers/guest");
const searchController = require("../controllers/search");

router.get("/", cache.route({ expire: 1000 }), welcomeController.show);

router.get("/register", usersController.new);
router.get("/users/current", usersController.current);
router.post("/users", usersController.create);

// router.get("/signIn", sessionController.new);
router.post("/session", sessionController.create);
router.delete("/session", sessionController.destroy);
// router.delete("/session", sessionController.destroy);

// SEARCH ROUTES
// router.get("/search", searchController.search);
router.get("/main", cache.route({ expire: 1000 }), searchController.indexLists);
router.post("/search", cache.route({ expire: 1000 }), searchController.search);
router.get(
  "/movie/:id",
  cache.route({ expire: 1000 }),
  searchController.movieShow
);
router.get("/tv/:id", cache.route({ expire: 1000 }), searchController.tvShow);
router.get(
  "/person/:id",
  cache.route({ expire: 1000 }),
  searchController.person
);
router.get("/guest", guestController.show);

module.exports = router;
