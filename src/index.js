const babel = require('babel-polyfill'); //Required for babel compiler
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const path = require('path');
const morgan = require('morgan');
//Get routes
const stuternRoutes = require('./route/player');

// Instantiate app
const app = express();

// //Get DB
const db = require('./db');

// //Check db connection with an IIFE
(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

if (process.env.NODE_ENV === 'production') {
  // We are running in production mode
  console.log('Production');
} else {
  // We are running in development mode
  app.use(morgan('dev'));
  console.log('Development');
}

//intialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use cors
app.use(cors());

//Set static folder
app.use(express.static(__dirname + '/../public'));

//Set views and register partials
let viewPath = path.join(__dirname, '../public/views');
app.set('views', viewPath);
app.set('view engine', 'hbs');

//Use routes
app.use(stuternRoutes);

module.exports = app;
