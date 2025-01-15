const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Hatalı şifre!" });
        }

        res.status(200).json({ message: "Giriş başarılı!", user });
    } catch (error) {
        console.error("Sunucu hatası:", error);
        res.status(500).json({ message: "Sunucu hatası!" });
    }
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Kayıt başarılı!' });
    } catch (error) {
        res.status(500).json({ message: 'Kayıt sırasında hata oluştu', error: error.message });
    }
});

module.exports = router;
