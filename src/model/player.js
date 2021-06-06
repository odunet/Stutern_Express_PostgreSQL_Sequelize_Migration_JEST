const { Sequelize, DataTypes } = require('sequelize');
const { model } = require('../db');
const db = require('../db');

const Player = db.define(
  'player',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, //Serial
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    club: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: 'player',
    timestamps: false,
  }
);

// Syncronize model with DB Table
const syncModel = async () => {
  try {
    let res = await Player.sync();
    console.log(res);
    console.log('The table for the User model was just (re)created!');
  } catch (err) {
    console.log(err);
  }
};

module.exports = Player;
