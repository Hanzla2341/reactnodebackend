const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const userRoutes = require('../routers/UserRouter');

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('API is running...'));

// Export as Vercel serverless function
module.exports = app;
