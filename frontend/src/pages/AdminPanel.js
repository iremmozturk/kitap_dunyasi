import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [stock, setStock] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');

    // Kitapları yükleme
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/books', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBooks(response.data);
            } catch (error) {
                alert('Kitaplar yüklenirken bir hata oluştu!');
                console.error('Kitap yükleme hatası:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [token]);

    // Kitap ekleme
    const handleAddBook = async () => {
        if (!title || !author || !price || !stock || !publishedDate) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/api/books/add',
                { title, author, price, description, publishedDate, stock, coverImage },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Kitap başarıyla eklendi!');
            setBooks([...books, response.data.book]); // Yeni kitabı listeye ekle
            setTitle('');
            setAuthor('');
            setPrice('');
            setDescription('');
            setPublishedDate('');
            setStock('');
            setCoverImage('');
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(`Hata: ${error.response.data.message}`);
            } else {
                alert('Kitap eklenirken bir hata oluştu!');
            }
            console.error('Kitap ekleme hatası:', error);
        }
    };

    // Kitap silme
    const handleDeleteBook = async (id) => {
        if (!window.confirm('Bu kitabı silmek istediğinize emin misiniz?')) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/books/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Kitap başarıyla silindi!');
            setBooks(books.filter((book) => book._id !== id)); // Kitabı listeden kaldır
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(`Hata: ${error.response.data.message}`);
            } else {
                alert('Kitap silinirken bir hata oluştu!');
            }
            console.error('Kitap silme hatası:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Paneli</h1>

            {/* Kitap Ekleme Formu */}
            <div className="add-book-form">
                <h2>Kitap Ekle</h2>
                <input
                    type="text"
                    placeholder="Kitap Adı"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Yazar"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Fiyat"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <textarea
                    placeholder="Açıklama"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    type="date"
                    placeholder="Yayın Tarihi"
                    value={publishedDate}
                    onChange={(e) => setPublishedDate(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Stok"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Kapak Resmi URL"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                />
                <button onClick={handleAddBook}>Kitap Ekle</button>
            </div>

            {/* Kitap Listesi */}
            <div className="book-list">
                <h2>Mevcut Kitaplar</h2>
                {loading ? (
                    <p>Yükleniyor...</p>
                ) : books.length === 0 ? (
                    <p>Henüz kitap eklenmemiş.</p>
                ) : (
                    books.map((book) => (
                        <div key={book._id} className="book-item">
                            <h3>{book.title}</h3>
                            <p>Yazar: {book.author}</p>
                            <p>Fiyat: {book.price} TL</p>
                            <p>Açıklama: {book.description}</p>
                            <p>Yayın Tarihi: {new Date(book.publishedDate).toLocaleDateString()}</p>
                            <p>Stok: {book.stock}</p>
                            <img
                                src={book.coverImage || 'default-cover.jpg'}
                                alt={book.title}
                                className="book-cover"
                            />
                            <button onClick={() => handleDeleteBook(book._id)}>Sil</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
