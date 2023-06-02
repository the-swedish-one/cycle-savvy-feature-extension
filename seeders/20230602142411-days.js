"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Days",
      [
        {
          dayOfCycle: 1,
        },
        {
          dayOfCycle: 2,
        },
        {
          dayOfCycle: 3,
        },
        {
          dayOfCycle: 4,
        },
        {
          dayOfCycle: 5,
        },
        {
          dayOfCycle: 6,
        },
        {
          dayOfCycle: 7,
        },
        {
          dayOfCycle: 8,
        },
        {
          dayOfCycle: 9,
        },
        {
          dayOfCycle: 10,
        },
        {
          dayOfCycle: 11,
        },
        {
          dayOfCycle: 12,
        },
        {
          dayOfCycle: 13,
        },
        {
          dayOfCycle: 14,
        },
        {
          dayOfCycle: 15,
        },
        {
          dayOfCycle: 16,
        },
        {
          dayOfCycle: 17,
        },
        {
          dayOfCycle: 18,
        },
        {
          dayOfCycle: 19,
        },
        {
          dayOfCycle: 20,
        },
        {
          dayOfCycle: 21,
        },
        {
          dayOfCycle: 22,
        },
        {
          dayOfCycle: 23,
        },
        {
          dayOfCycle: 24,
        },
        {
          dayOfCycle: 25,
        },
        {
          dayOfCycle: 26,
        },
        {
          dayOfCycle: 27,
        },
        {
          dayOfCycle: 28,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Days", null, {});
  },
};
