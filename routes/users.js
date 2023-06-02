var express = require("express");
var router = express.Router();
const db = require("../modelOLD/helper");

//GET ALL symptoms
router.get("/", async function (req, res, next) {
  try {
    const results = await db(`SELECT * FROM symptoms`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

//GET all columns (symptom_name, self_care_tips, partner_support_tips) from symptoms table per specific day_of_cycle
router.get("/days/:day/symptoms", async function (req, res, next) {
  try {
    const results = await db(
      `SELECT * FROM symptoms AS s LEFT JOIN days_symptoms as ds ON s.id = ds.symptom_id WHERE day_of_cycle = ${req.params.day};`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = router;
