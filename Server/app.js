const express = require('express');
const cors = require('cors');

// handlers
//const categoryRoutes = require('./routes/category');
const itemRoutes = require('./routes/item');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
//app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);

module.exports = app;
