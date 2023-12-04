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

### Data.js

The `data.js` file contains sample product data used in the project. It exports an array of products with details such as name, image, price, etc.

```javascript
// data.js
// ...

const data = {
  products: [
    // Sample product data
    // ...
  ],
};

export default data;
```

### Package.json

The `package.json` file for the backend specifies the dependencies required, including Express, CORS, dotenv, MongoDB, and Mongoose.

```javascript
// package.json
{
  "type": "module",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongodb": "^6.3.0",
    "mongoose": "^8.0.1"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

### Frontend

### Index.js

The `index.js` file sets up the React root and renders the main App component. It also includes Bootstrap CSS for styling.

```javascript
// index.js
// ...
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
```

### App.js

The `App.js` file defines the main React component. It includes the navigation, routes, and global state management using the Store context.

```javascript
// App.js
// ...
function App() {
  // ...
}
export default App;
```

### Store.js

The `Store.js` file sets up the global state using React's context API and provides a StoreProvider component for wrapping the entire application.

```javascript
// Store.js
// ...
export function StoreProvider(props) {
  // ...
}
```
