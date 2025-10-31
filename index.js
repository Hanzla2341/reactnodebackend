// /api/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const userRoutes = require('../routers/UserRouter');
const serverless = require('serverless-http');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', userRoutes);
app.get('/', (req, res) => {
  res.send("Hello from Express + Vercel!");
});

module.exports = app;
module.exports.handler = serverless(app);  // ✅ important for Vercel
