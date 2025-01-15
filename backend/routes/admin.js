const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Admin modeli
const bcrypt = require('bcrypt');

// JWT Secret Key
const JWT_SECRET = 'my_super_secret_key';

// Admin giriş endpoint'i
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log("Gelen istek verileri:", { email, password }); // Gelen email ve şifreyi logla

    try {
        // Admini veritabanından bul
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("Admin bulunamadı!");
            return res.status(404).json({ success: false, message: 'Admin bulunamadı!' });
        }

        console.log("Admin bulundu:", admin); // Bulunan admin bilgilerini logla

        // Şifre doğrulama
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            console.log("Geçersiz şifre!");
            return res.status(401).json({ success: false, message: 'Geçersiz şifre!' });
        }

        console.log("Şifre doğru!");

        // Token oluşturma
        const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '1h' });
        console.log("Oluşturulan token:", token);

        // Başarı yanıtı döndür
        res.status(200).json({
            success: true,
            message: 'Giriş başarılı!',
            token,
            role: admin.role,
        });
    } catch (error) {
        console.error('Sunucu hatası:', error);
        res.status(500).json({ success: false, message: 'Sunucu hatası!' });
    }
});

module.exports = router;
