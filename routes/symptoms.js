const express = require("express");
const router = express.Router();
const models = require("../models");

//GET ALL symptoms
router.get("/", async function (req, res) {
  try {
    const symptoms = await models.Symptom.findAll();
    res.send(symptoms);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET all columns (symptomName, selfCareTips, partnerSupportTips) from symptoms table for a specific dayOfCycle
router.get("/days/:dayOfCycle", async function (req, res, next) {
  const { dayOfCycle } = req.params;

  try {
    const day = await models.Day.findOne({
      where: {
        dayOfCycle,
      },
    });

    const symptoms = await day.getSymptoms({
      // attributes: ["symptomName", "selfCareTips", "partnerSupportTips"],
    });

    res.send(symptoms);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = router;
