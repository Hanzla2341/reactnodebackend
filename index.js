// /api/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const userRoutes = require('../routers/UserRouter');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use('/api', userRoutes);
app.get('/', (req,res)=>{
  res.send("hello")
});

// Instead of module.exports = app:
const serverless = require('serverless-http');
module.exports = serverless(app);
