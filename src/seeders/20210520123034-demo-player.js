'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('player', [
      {
        name: 'John Doe',
        club: 'Rivers United',
        position: 'Developer',
        imageid: 'sampleimagename.jpeg',
        created_at: new Date(),
        nationality: 'Nigerian',
        // createdAt: new Date(),
        // updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'player',
      {
        id: 8,
      },
      {}
    );
  },
};
