const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
// const apiRouter = require('./api.js');
const cors = require('cors');
app.use(cors());

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname,  '../client'));
app.use(express.static(path.join(__dirname, '../client')));
// app.use(express.static(path.join(__dirname, '../../extension/dist')));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
