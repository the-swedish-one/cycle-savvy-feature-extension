var express = require("express");
var router = express.Router();
const models = require("../models");
// const userShouldExist = require("..guards/userShouldExist");

//GET ALL users
router.get("/", async function (req, res) {
  try {
    const users = await models.User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET user by id
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;

  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
    });

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = router;
