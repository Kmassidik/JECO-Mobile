"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let categories = require("./categories.json");
    categories = categories.map((e) => {
      (e.createdAt = new Date()), (e.updatedAt = new Date());
      return e;
    });
    await queryInterface.bulkInsert("Categories", categories);

    let items = require("./items.json");
    items = items.map((e) => {
      (e.mongoUserId = "652d72bc45c31b3015681746"),
        (e.createdAt = new Date()),
        (e.updatedAt = new Date());
      return e;
    });
    await queryInterface.bulkInsert("Items", items);

    let ingredients = require("./ingredients.json");
    ingredients = ingredients.map((e) => {
      (e.createdAt = new Date()), (e.updatedAt = new Date());
      return e;
    });
    await queryInterface.bulkInsert("Ingredients", ingredients);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Items", null, {});
    await queryInterface.bulkDelete("Ingredients", null, {});
  },
};
