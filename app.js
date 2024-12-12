const express = require('express');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/api');

connectDB();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use API routes
app.use('/api/v1/', apiRoutes);


// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app;
