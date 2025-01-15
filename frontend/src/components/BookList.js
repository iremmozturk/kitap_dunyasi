import React from 'react';
import './BookList.css';

const BookList = ({ books, addToCart }) => {
    if (!books || books.length === 0) {
        return <p>Kitap bulunamadı.</p>;
    }

    return (
        <div className="book-list">
            {books.map((book) => (
                <div key={book._id} className="book-item">
                    <img src={book.coverImage || 'default-cover.jpg'} alt={book.title} className="book-image" />
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">Yazar: {book.author}</p>
                    <p className="book-price">Fiyat: {book.price} TL</p>
                    <button className="add-to-cart-button" onClick={() => addToCart(book)}>
                        Sepete Ekle
                    </button>
                </div>
            ))}
        </div>
    );
};

export default BookList;
