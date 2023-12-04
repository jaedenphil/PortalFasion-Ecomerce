import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// Middleware for CORS
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'https://portalfashion-frontend.onrender.com'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Routes
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
