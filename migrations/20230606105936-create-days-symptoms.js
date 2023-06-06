"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("DaysSymptoms", {
      dayId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Days",
          key: "id",
        },
        allowNull: false,
      },
      symptomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Symptoms",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("DaysSymptoms");
  },
};
