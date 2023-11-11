const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/products', (req, res) => {
  // Read product data from a file using fs and path modules
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const products = JSON.parse(data);
    res.status(200).json(products);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
