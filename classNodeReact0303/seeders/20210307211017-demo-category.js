'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Categorys', [
      {
        name: 'Eletronicos',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Escritorio',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Higiene',
        // status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vestuario',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Categorys', null, {});

  }
};
