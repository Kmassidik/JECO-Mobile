"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Items", "mongoUserId", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("Items", "categoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Categories",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addColumn("Ingredients", "itemId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Items",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addColumn("Ingredients", "imageUrl", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Items", "mongoUserId");
    await queryInterface.removeColumn("Items", "categoryId");
    await queryInterface.removeColumn("Ingredients", "itemId");
    await queryInterface.removeColumn("Ingredients", "imageUrl");
  },
};
