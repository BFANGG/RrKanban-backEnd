'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Label', [{
      color: '#a8193d',
      text: ' ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      color: '#4fcc25',
      text: ' ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      color: '#1ebffa',
      text: ' ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      color: '#8da377',
      text: ' ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      color: '#9975bd',
      text: ' ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      color: '#cf61a1',
      text: ' ',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      color: '#240959',
      text: ' ',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Label', null, {});
  }
};
