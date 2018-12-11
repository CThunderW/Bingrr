const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
    res.render("users/new");
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const {userName, firstName, lastName, email, password } = req.body;
    bcrypt.genSalt(10, async function(err, salt) {
        bcrypt.hash(password, salt, async function(err, passwordDigest) {
            const [id] = await knex("users")
            .insert({
                userName,
                firstName,
                lastName,
                email,
                passwordDigest
            })
            .returning('id');
            // req.session.userID = id;
            res.redirect('/');
        });
    });
    // res.json(req.body)
});



module.exports = router;