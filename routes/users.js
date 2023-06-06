var express = require("express");
var router = express.Router();
const models = require("../models");

//GET ALL users
router.get("/", async function (req, res) {
  try {
    const users = await models.User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
