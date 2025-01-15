const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Kitapları arayan veya tümünü getiren endpoint
router.get('/', async (req, res) => {
    const { search } = req.query;
    try {
        const books = search
            ? await Book.find({ title: { $regex: search, $options: 'i' } })
            : await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Kitap arama sırasında hata oluştu', error: err.message });
    }
});

// Yeni kitap ekleyen endpoint
router.post('/add', async (req, res) => {
    const { title, author, description, publishedDate, coverImage, price, stock } = req.body;
    if (!title || !author || !price || !stock) {
        return res.status(400).json({ message: 'Başlık, yazar, fiyat ve stok bilgisi zorunludur.' });
    }
    const book = new Book({ title, author, description, publishedDate, coverImage, price, stock });
    try {
        const newBook = await book.save();
        res.status(201).json({ message: 'Kitap başarıyla eklendi!', book: newBook });
    } catch (err) {
        res.status(500).json({ message: 'Kitap ekleme sırasında hata oluştu', error: err.message });
    }
});

// Kitap silen endpoint
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Kitap bulunamadı!' });
        }
        res.status(200).json({ message: 'Kitap başarıyla silindi!', book: deletedBook });
    } catch (err) {
        res.status(500).json({ message: 'Kitap silme sırasında hata oluştu', error: err.message });
    }
});

// Kitap güncelleyen endpoint
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, description, publishedDate, coverImage, price, stock } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, description, publishedDate, coverImage, price, stock },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Kitap bulunamadı!' });
        }
        res.status(200).json({ message: 'Kitap başarıyla güncellendi!', book: updatedBook });
    } catch (err) {
        res.status(500).json({ message: 'Kitap güncelleme sırasında hata oluştu', error: err.message });
    }
});

router.get('/new', async (req, res) => {
    try {
        const books = await Book.find({
            publishedDate: {
                $gte: new Date('2020-01-01'),
                $lt: new Date('2026-01-01'),
            },
        }).sort({ publishedDate: -1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Kitaplar yüklenirken hata oluştu', error: err.message });
    }
});

router.get('/bestsellers', async (req, res) => {
    try {
        const books = await Book.find().sort({ stock: -1 }).limit(5);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: 'Kitaplar yüklenirken hata oluştu', error: err.message });
    }
});

module.exports = router;
