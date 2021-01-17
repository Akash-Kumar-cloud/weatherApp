const path = require('path');
const express = require('express');

const app = express();

const publicPathDirectory = path.join(__dirname, '../public');

app.use(express.static(publicPathDirectory));

//simple Routing

app.get('', (req, res) => {
  res.send('You are in Home Page');
});

app.get('/help', (req, res) => {
  res.send('You are in Help Page');
});

app.listen(3000, () => {});
