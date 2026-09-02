const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return true;
  }

  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kannan_portfolio';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000
    });
    isConnected = true;
    console.log(`[MongoDB] Database connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Could not connect to MongoDB server: ${error.message}`);
    console.warn(`[MongoDB] Portfolio REST API will operate in high-reliability Memory-Cache fallback mode.`);
    return false;
  }
};

module.exports = connectDB;
