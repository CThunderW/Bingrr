const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const bcrypt = require("bcrypt");

const tmdb = "https://api.themoviedb.org/3/search/multi?" + tmdbKey;

router.post("/search", (req, res) => {
  const { search_query } = req.body;
  let result = $.getJSON(tmdb + `${search_query}`);
  res.render(result);
});

multiSearch = searchInput => {};

module.exports = router;
