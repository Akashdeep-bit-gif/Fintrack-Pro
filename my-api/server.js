const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: '✅ Express Engine is running smoothly', 
        time: new Date() 
    });
});

// Ignition
app.listen(PORT, () => {
    console.log(`🚀 API Server active on http://localhost:${PORT}`);
});