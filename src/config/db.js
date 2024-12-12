const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbUrl = process.env.DB_URL;
    // console.log('DB_URL:', dbUrl); // Debugging line
    await mongoose.connect(dbUrl, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
