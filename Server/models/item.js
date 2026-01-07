const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // your "food-001"
  picture: { type: String },                            // image URL or path
  name: { type: String, required: true },              // Cheese Omelette
  price: { type: Number, required: true },             // 3.5
  cookingTime: { type: Number },                       // 6 (minutes)
  rating: { type: Number, default: 0 },               // 4.3
  calories: { type: Number },                          // 420
  category: { type: String, required: true },          // "eggs"
  types: { type: [String] },                           // ["breakfast", "brunch"]
  available: { type: Boolean, default: true },         // true/false
  ingredients: { type: [String] },                     // ["Eggs", "Cheese", ...]
  supplements: { type: [String] }                     // ["Extra cheese", "Mushrooms"]
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Item', ItemSchema);
