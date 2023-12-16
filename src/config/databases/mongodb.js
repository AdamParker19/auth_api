const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

// Create a centralized MongoDB connection
const mongoConnect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error}`);
  }
};

module.exports = mongoConnect;
