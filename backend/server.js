import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDb');
  })
  .catch((err) => {
    console.log(err.message);
  });
const app = express();
const port = 3001;
app.use(express.static('public'));
// Root route
app.get('/', (req, res) => {
  res.send('Server is running on http://localhost:' + port);
});
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'https://portalfashion-frontend.onrender.com'
  ); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Products route
app.get('/api/products', (req, res) => {
  res.json(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});
app.get('/api/products/:_id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params._id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});
