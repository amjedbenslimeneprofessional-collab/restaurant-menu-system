const mongoose = require('mongoose');
require('dotenv').config();
const Item = require('../models/item');

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDB:', process.env.MONGO_URI);

    const total = await Item.countDocuments();
    const available = await Item.countDocuments({ available: true });
    const all = await Item.find().limit(10).lean();

    console.log('Total items in collection:', total);
    console.log('Items with `available: true`:', available);
    console.log('Sample documents (up to 10):');
    console.dir(all, { depth: 4, colors: false });

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error inspecting items:', err.message);
    process.exit(1);
  }
}

main();
