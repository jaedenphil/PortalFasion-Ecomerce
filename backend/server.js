import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './usermodel.js';
import passport from 'passport';
import { seedUsers } from './data.js';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDb');
    await seedUsers();
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
const MongoStore = connectMongo(session);

app.use(
  session({
    secret: 'YourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
import './config/passport.js';

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// User Login
app.post(
  '/api/login',
  passport.authenticate('local'),
  (req, res) => {
    res.status(200).send('Login successful');
  }
);
app.get('/api/logout', (req, res) => {
  req.logout();
  // You can perform additional cleanup or redirect logic here
  res.redirect('/');
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
