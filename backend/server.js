import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productsRoutes.js';
import userRouter from './routes/userRoutes.js';
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
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Products route
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
// Start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});
