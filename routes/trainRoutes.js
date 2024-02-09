// routes/trainRoutes.js
const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

router.post('/', trainController.createTrain);

module.exports = router;