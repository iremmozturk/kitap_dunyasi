const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/admin'); 
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const connectDB = require('./config/db');
const app = express();

// Veritabanı bağlantısını başlat
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// Admin endpoint'ini tanımlayın
app.use('/api/admin', adminRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/users', userRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
