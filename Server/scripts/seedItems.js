const mongoose = require('mongoose');
require('dotenv').config();
const Item = require('../models/item');
const path = require('path');

const dataPath = path.join(__dirname, '../../Client/src/data/data.json');
const items = require(dataPath);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Connected to MongoDB:', process.env.MONGO_URI);

    if (!Array.isArray(items) || items.length === 0) {
      console.error('No items found in', dataPath);
      process.exit(1);
    }

    const ops = items.map((it) => ({
      updateOne: {
        filter: { id: it.id },
        update: { $set: it },
        upsert: true,
      },
    }));

    const result = await Item.bulkWrite(ops, { ordered: false });
    console.log('Seed completed. Result:', result.result || result);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding items:', err);
    process.exit(1);
  }
}

main();
