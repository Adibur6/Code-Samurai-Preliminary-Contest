// routes/stationRoutes.js
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

router.post('/', stationController.createStation);
router.get('/', stationController.listStations);

router.get('/:station_id/trains', stationController.listTrainsAtStation);
module.exports = router;