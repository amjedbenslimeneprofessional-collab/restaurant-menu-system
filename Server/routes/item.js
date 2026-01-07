const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getAllItems,
  getItemById,
} = require('../controllers/item');

// ROUTES

// GET all items
router.get('/', getAllItems); // GET /api/items


// GET single item by id
router.get('/:id', getItemById); // GET /api/items/food-001


module.exports = router;
