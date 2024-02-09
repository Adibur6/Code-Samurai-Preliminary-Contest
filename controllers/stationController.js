// controllers/stationController.js
const Station = require('../models/Station');
const Train = require('../models/Train');


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


exports.listStations = async (req, res) => {
  try {
    const stations = await Station.find().sort('station_id');
    
    // Create a response array
    const response = stations.map(station => ({
      station_id: station.station_id,
      station_name: station.station_name,
      longitude: station.longitude,
      latitude: station.latitude
    }));

    res.status(200).json({ stations: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.listTrainsAtStation = async (req, res) => {
  try {
    const station_id = req.params.station_id;
    
    // Check if the station exists
    const station = await Station.findOne({ station_id });
    console.log(station);
    if (!station) {
      return res.status(404).json({ message: `station with id: ${station_id} was not found` });
    }
    console.log(station);

    const trains = await Train.find({ 'stops.station_id': station_id }).sort({
      'stops.departure_time': 1,
      'stops.arrival_time': 1,
      train_id: 1
    });
    console.log(trains);


    // Create a response array
    const response = trains.map(train => {
        const stop = train.stops.find(stop => stop.station_id.toString() === station_id);
      
        if (!stop) {
          return null;
        }
      
        return {
          train_id: train.train_id,
          arrival_time: stop.arrival_time,
          departure_time: stop.departure_time
        };
      }).filter(item => item !== null);
    console.log(response);

    // If no trains are found, response will be an empty array
    res.status(200).json({ station_id, trains: response.length ? response : [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};