const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const seedUsers = async () => {
    await connectDB();

    const users = [
        {
            email: 'iremozturk_@outlook.com',
            password: 'iremecem.45', // Şifreleri hashlemeyi unutmayın
            role: 'user',
        },
        {
            email: 'iremozturk_@outlook.com',
            password: 'iremecem.45',// Şifreleri hashlemeyi unutmayın
            role: 'admin',
        },
    ];

    try {
        await User.insertMany(users);
        console.log('Kullanıcılar başarıyla eklendi');
    } catch (error) {
        console.error('Kullanıcılar eklenirken hata oluştu:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedUsers();