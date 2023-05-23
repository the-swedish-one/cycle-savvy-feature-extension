var express = require('express');
var router = express.Router();
const db = require("../model/helper");

//GET ALL symptoms
router.get('/', async function (req, res, next) {
  try {
    const results = await db(`SELECT * FROM symptoms`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

//GET symptoms per specific day_of_cycle
router.get('/:day', async function (req, res, next) {

  try {
    const results = await db(`SELECT * FROM days_symptoms WHERE day_of_cycle = ${req.params.day};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});




module.exports = router;
