const models = require("../models");

async function usernameShouldNotExist(req, res, next) {
  const { username } = req.body;
  try {
    const user = await models.User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      next();
    } else
      res.status(400).send({
        message: "Username already exists, please choose another one",
      });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = usernameShouldNotExist;
