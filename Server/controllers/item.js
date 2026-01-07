const mongoose = require('mongoose');
const Item = require('../models/item');

// Helper to check if a string is a valid Mongo ObjectId
const isObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ available: true }); // only available items
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET item by ID (accepts either custom `id` field or Mongo `_id`)
const getItemById = async (req, res) => {
  try {
    const param = req.params.id;
    let item;
    if (isObjectId(param)) {
      item = await Item.findById(param);
    }
    if (!item) {
      item = await Item.findOne({ id: param });
    }
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getAllItems,
  getItemById,
};
