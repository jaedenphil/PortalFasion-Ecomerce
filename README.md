# PortalFashion - Full Stack Ecommerce Website

PortalFashion is a Full Stack Ecommerce Website built with MongoDB, Mongoose, Bootstrap CSS, and deployed on Render.com.

## Table of Contents

- [Project Overview](#project-overview)
- [Backend](#backend)
  - [Server.js](#serverjs)
  - [data.js](#datajs)
  - [package.json](#packagejson)
- [Frontend](#frontend)
  - [index.js](#indexjs)
  - [App.js](#appjs)
  - [Store.js](#storejs)
  - [HomeScreen.js](#homescreenjs)
  - [ProductScreen.js](#productscreenjs)
  - [SignInScreen.js](#signinscreenjs)
  - [CartScreen.js](#cartscreenjs)
- [Components](#components)
  - [Product.js](#productjs)
  - [Rating.js](#ratingjs)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

PortalFashion is a full-fledged Ecommerce website that allows users to browse through various products, view product details, add items to the shopping cart, and proceed to checkout. The project uses MongoDB for data storage, Mongoose as the ODM, Bootstrap CSS for styling, and is deployed on Render.com.

## Backend

### Server.js

The `Server.js` file is the main server file for the backend. It sets up an Express server, connects to MongoDB using Mongoose, and defines routes for serving product data. CORS is configured to allow requests from the frontend hosted on Render.com.

```javascript
// Server.js
// ...

// Products route
app.get('/api/products', (req, res) => {
  res.json(data.products);
});

// ...

// Start the server
app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});
```
