import express from 'express';
import data from './data.js';

const app = express();
const port = 3001;

// Root route
app.get('/', (req, res) => {
  res.send('Server is running on http://localhost:' + port);
});

// Products route
app.get('/api/products', (req, res) => {
  res.json(data.products);
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});
