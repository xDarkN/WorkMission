const express = require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const app = express();

mongoose.connect('mongodb://mongo:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const Item = mongoose.model('Item', {
  _id: Number,
  name: String,
  qty: Number,
  rating: Number,
});

app.get('/', async (req, res) => {
  try {
    const apples = await Item.findOne({ name: 'apples' });
    console.log('Apples:', apples);
    if (apples) {
      res.send(`Number of apples: ${apples.qty}`);
    } else {
      res.send('Apples not found.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});