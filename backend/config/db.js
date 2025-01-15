const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://iremozturk:iremecem.45@cluster0.mhqjn.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB bağlantısı başarılı');
    } catch (error) {
        console.error('MongoDB bağlantı hatası:', error);
        process.exit(1);
    }
};

module.exports = connectDB;