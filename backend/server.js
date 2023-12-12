require('dotenv').config();

import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import session from 'express-session';

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
console.log(process.env.SECRET);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Define User model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// Passport Configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, {
          message: 'Incorrect username or password.',
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Registration Route
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error, 'Error has occurred while registering');
    res.redirect('/register');
  }
});

// Login Route
app.post(
  '/api/login',
  passport.authenticate('local', { failureMessage: true }),
  (req, res) => {
    res.json({ success: true, user: req.user });
  }
);

// Logout Route
app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

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
