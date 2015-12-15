'use strict';
let mongoose = require('mongoose');

let placeSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  zipcode: Number, 
  venueId: String,
  artistBio: String,
  artInfo: String,
  areaInfo: String
})

let Place = mongoose.model('Place', placeSchema)
module.exports = Place;
