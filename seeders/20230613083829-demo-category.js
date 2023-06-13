'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Category', [
      {
        name: 'Male Tops',
        parntId: null,
        properties: JSON.stringify({
          color: ['red', 'blue', 'green'],
          size: ['S', 'M', 'L', 'XL']
        })
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
