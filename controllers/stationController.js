// controllers/stationController.js
const Station = require('../models/Station');

exports.createStation = async (req, res) => {
  try {
    const station = new Station(req.body);
    const savedStation = await station.save();

    // Create a response object
    const response = {
      station_id: savedStation.station_id,
      station_name: savedStation.station_name,
      longitude: savedStation.longitude,
      latitude: savedStation.latitude
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};