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

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});
