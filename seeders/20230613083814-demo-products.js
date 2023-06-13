"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        title: "T-Shirt",
        description: "This is a T-Shirt",
        price: 10.0,
        images: JSON.stringify(["/images/products/t-shirt/red.jpg"]),
        categoryId: null,
        properties: JSON.stringify(["red"]),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
