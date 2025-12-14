const mongoose = require('mongoose');

const PlanetSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Mercury"
  tagline: { type: String }, // e.g., "The Swift Planet"
  description: { type: String }, // The long text from "Home - Planet" screens
  image: { type: String }, // URL to the planet image
  stats: {
    distance: String,    // "57.91 million km"
    radius: String,      // "2,439.7 km"
    surfaceArea: String, // "74.8 million km²"
    lengthOfDay: String  // "58d 15h 30m"
  }
});

module.exports = mongoose.model('Planet', PlanetSchema);