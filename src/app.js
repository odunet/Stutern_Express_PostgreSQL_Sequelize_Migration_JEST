//get app
const app = require('./index');
//Get env variable
const { PORT } = process.env;

app.listen(PORT, () => {
  `Listening on ${PORT}`;
});
