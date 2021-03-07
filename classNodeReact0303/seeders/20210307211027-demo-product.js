'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Products', [
      {
        name: 'televisao',
        price: 1000,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'celular',
        price: 2000,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'fone',
        price: 150.6,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'caneta',
        price: 8.8,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'cadeira de escritorio',
        price: 120.3,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'lapiseira',
        price: 10.5,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'papel higienico',
        price: 9.3,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'creme dental',
        price: 6,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'sabonete',
        price: 8,
        category_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'camiseta',
        price: 75,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'calça',
        price: 80.4,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'meia',
        price: 15,
        category_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Products', null, {});

  }
};
