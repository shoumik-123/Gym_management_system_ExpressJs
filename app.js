const express = require('express');
const connectDB = require('./src/config/db');
const apiRoutes = require('./src/routes/api');

connectDB();
const app = express();

app.use(express.json());

app.use('/api/v1/', apiRoutes);


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

module.exports = app;
