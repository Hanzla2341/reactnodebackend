const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const serverless = require('serverless-http');
const connectDB = require('./config/db');
const userRoutes = require('./routers/UserRouter');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Lazy DB connection (ensures it connects only when needed)
app.use(async (req, res, next) => {
  if (!global.dbConnected) {
    try {
      await connectDB();
      global.dbConnected = true;
    } catch (err) {
      console.error("DB Connection Error:", err.message);
      return res.status(500).json({ message: "Database connection failed" });
    }
  }
  next();
});

app.use('/api', userRoutes);

app.get('/', (req, res) => res.send("Hello from root Express + Vercel!"));

module.exports = app;
module.exports.handler = serverless(app);