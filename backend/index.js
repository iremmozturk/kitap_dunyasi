const express = require('express');
const serverless = require('serverless-http'); // Eklenmeli
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend çalışıyor!' });
});

// Export as Serverless Function
module.exports = app;
module.exports.handler = serverless(app);
