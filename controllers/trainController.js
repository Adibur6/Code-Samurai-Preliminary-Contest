// controllers/trainController.js
const Train = require('../models/Train');

exports.createTrain = async (req, res) => {
  try {
    const train = new Train(req.body);
    const savedTrain = await train.save();

    // Create a response object
    const response = {
      train_id: savedTrain.train_id,
      train_name: savedTrain.train_name,
      capacity: savedTrain.capacity,
      service_start: savedTrain.stops[0].departure_time,
      service_ends: savedTrain.stops[savedTrain.stops.length - 1].arrival_time,
      num_stations: savedTrain.stops.length
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};