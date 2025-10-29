const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routers/UserRouter');

// Load environment variables from .env
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());            // Enable CORS
app.use(express.json());    // Parse incoming JSON

// Connect to MongoDB
connectDB();

// Mount API routes
app.use('/api', userRoutes);

// Homepage test route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler (optional, for better debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
