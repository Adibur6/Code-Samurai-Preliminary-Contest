// models/Train.js
const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
  station_id: Number,
  arrival_time: String,
  departure_time: String,
  fare: {
    type: Number,
    default: 0
  }
});

const TrainSchema = new mongoose.Schema({
  train_id: Number,
  train_name: String,
  capacity: Number,
  stops: [StopSchema]
});

module.exports = mongoose.model('Train', TrainSchema);