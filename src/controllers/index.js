// We are running in development mode
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
//Get env variable
require('dotenv').config();

//Bringing in sequelize DB and Model
const db = require('../db');
const Player = require('../model/player');

/**
 * @param  {Express.object} req
 * @param  {Express.object: html} res
 * @method Get
 */
exports.landingPage = (req, res) => {
  res.status(200).render('../../public/views/index.hbs');
};

exports.createPlayer = async (req, res) => {
  const errors = validationResult(req);
  // Evaluate if there are errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const player = await Player.create({
      name: req.body.name,
      position: req.body.position,
      imageid: req.body.image,
      club: req.body.clubName,
    });
    res.status(200).json({
      statusCode: 200,
      message: `User with name: '${req.body.name}' has been created`,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      statusCode: 401,
      Error: err.message,
    });
  }
};

exports.getPlayer = async (req, res) => {
  const data = await Player.findAll();
  res.status(200).json({ data });
};

exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.update(
      {
        name: req.body.name,
        position: req.body.position,
        club: req.body.clubName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      statusCode: 200,
      message: `User with name: '${req.body.name}' has been updated`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      statusCode: 401,
      Error: err.message,
    });
  }
};

exports.updatePage = async (req, res) => {
  res.status(200).render('../../public/views/updatePlayer.hbs');
};

exports.updateAvatar = async (req, res) => {
  try {
    //Get lenght of DB
    const data = await Player.findAll();
    let DBlenght = data.length;
    if (parseInt(req.params.id) < 1 || req.params.id > DBlenght) {
      throw new Error();
    }

    let player = await Player.findAll({
      where: {
        id: req.params.id,
      },
    });
    let image = player[0].imageid;
    let newPath = path.join(__dirname, '../../public/avatar/', `${image}`);
    let oldPath = path.join(
      __dirname,
      '../../public/avatar/',
      `${req.file.filename}`
    );
    fs.renameSync(oldPath, newPath, () => {
      if (err) console.log(err);
      console.log('File renamed');
    });
    res.status(200).json({ msg: 'Done' });
  } catch (err) {
    console.log(err.message);
    let oldPath = path.join(
      __dirname,
      '../../public/avatar/',
      `${req.file.filename}`
    );
    fs.unlinkSync(oldPath, (err) => {
      if (err) console.log('err');
      else {
        ('Renamed unsaved file');
      }
    });
    res.status(401).json({ Error: err.message });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    let player = await Player.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ player });
  } catch (err) {
    res.status(401).json({ Error: err });
  }
};
