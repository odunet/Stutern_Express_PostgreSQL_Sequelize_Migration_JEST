'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'player',
      {
        // Model attributes are defined here
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true, //Serial
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        position: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        club: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        imageid: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('player');
  },
};
