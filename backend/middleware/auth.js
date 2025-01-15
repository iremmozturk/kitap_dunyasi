const jwt = require('jsonwebtoken');

// JWT Secret Key (Buraya kendi secret key'inizi yazın)
const JWT_SECRET = 'my_super_secret_key';

// Middleware: Token Doğrulama
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>" şeklinde gelen token'ı ayıklar

    if (!token) {
        return res.status(403).json({ success: false, message: 'Token bulunamadı!' });
    }

    try {
        // Token doğrulama
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Token'dan gelen bilgileri `req.user` içine ekle
        next(); // Bir sonraki middleware veya route'a geç
    } catch (error) {
        res.status(401).json({ success: false, message: 'Geçersiz token!' });
    }
    
};

module.exports = verifyToken;
