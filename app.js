const express = require('express');
const mongoose = require('mongoose');
const connectToDatabase = require('./services/db');


const cors = require('cors');
const bodyParser = require("body-parser");

const userRoutes = require('./routes/userRoutes');
const walletRoutes = require('./routes/walletRoutes');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

connectToDatabase();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Backend!');
});

app.all('*', (req, res) => {
  res.status(404).send({ message: 'API not found.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
