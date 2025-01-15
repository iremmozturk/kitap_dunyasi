import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';

const Home = ({ addToCart }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Kitaplar yüklenemedi:', error.message);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2>Kitap Listesi</h2>
            <BookList books={books} addToCart={addToCart} />
        </div>
    );
};

export default Home;
