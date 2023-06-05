"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Symptoms",
      [
        {
          symptomName: "Moderate to heavy menstrual bleeding",
          selfCareTips:
            "Use a menstrual cup or tampons with higher absorbency. Change pads or tampons regularly.",
          partnerSupportTips:
            "Offer to run errands or help with household chores during her period. Offer emotional support and understanding during this time.",
        },
        {
          symptomName: "Lighter menstrual bleeding or spotting",
          selfCareTips:
            "Use panty liners or light absorbency tampons. Keep track of your cycle to anticipate spotting. Stay hydrated to support overall menstrual health.",
          partnerSupportTips:
            "Be understanding and patient if plans need to be adjusted. Provide emotional support and reassurance.",
        },
        {
          symptomName: "",
          selfCareTips: "",
          partnerSupportTips: "",
        },
        {
          symptomName: "",
          selfCareTips: "",
          partnerSupportTips: "",
        },
        {
          symptomName: "",
          selfCareTips: "",
          partnerSupportTips: "",
        },
        {
          symptomName: "",
          selfCareTips: "",
          partnerSupportTips: "",
        },
        {
          symptomName: "",
          selfCareTips: "",
          partnerSupportTips: "",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Symptoms", null, {});
  },
};
