const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Planet = require('./models/Planets');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Replace with your actual URI)
mongoose.connect('mongodb://localhost:27017/stella_app');

// GET all planets for the Carousel
app.get('/api/planets', async (req, res) => {
  try {
    const planets = await Planet.find();
    res.json(planets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));