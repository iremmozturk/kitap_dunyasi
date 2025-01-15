const mongoose = require('mongoose');
const Book = require('../models/Book');
require('dotenv').config();

const books = [
    {
        title: "Sefiller",
        author: "Victor Hugo",
        description: "Bir adamın kefaret ve adalet arayışı üzerine destansı bir hikaye.",
        publishedDate: "1862-01-01",
        coverImage: "https://via.placeholder.com/150",
        price: 85,
        stock: 12,
    },
    {
        title: "1984",
        author: "George Orwell",
        description: "Totaliter bir rejimin baskısını anlatan, distopik bir roman.",
        publishedDate: "1949-06-08",
        coverImage: "https://via.placeholder.com/150",
        price: 60,
        stock: 25,
    },
    {
        title: "Suç ve Ceza",
        author: "Fyodor Dostoyevski",
        description: "Bir adamın işlediği suçla yüzleşmesini konu alan klasik bir eser.",
        publishedDate: "1866-01-01",
        coverImage: "https://via.placeholder.com/150",
        price: 70,
        stock: 10,
    },
    {
        title: "Küçük Prens",
        author: "Antoine de Saint-Exupéry",
        description: "Bir çocuğun gözünden büyüleyici bir hayal dünyası.",
        publishedDate: "1943-04-06",
        coverImage: "https://via.placeholder.com/150",
        price: 35,
        stock: 50,
    },
    {
        title: "Hayvan Çiftliği",
        author: "George Orwell",
        description: "Siyasi bir alegori niteliğinde, hayvanların başkaldırısını konu alan roman.",
        publishedDate: "1945-08-17",
        coverImage: "https://via.placeholder.com/150",
        price: 50,
        stock: 30,
    },
];

const seedBooks = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB bağlantısı başarılı');

        await Book.deleteMany(); // Eski kitapları siler
        await Book.insertMany(books); // Yeni kitapları ekler
        console.log('Kitaplar başarıyla eklendi');
        process.exit();
    } catch (error) {
        console.error('Kitap eklenirken hata:', error);
        process.exit(1);
    }
};

seedBooks();
