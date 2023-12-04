import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

productRouter.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default productRouter;
