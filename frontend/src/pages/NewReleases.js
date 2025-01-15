import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';

const NewReleases = ({ addToCart }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/new');
                setBooks(response.data);
            } catch (error) {
                console.error('Yeni çıkan kitaplar yüklenemedi:', error);
            }
        };

        fetchNewReleases();
    }, []);

    return (
        <div>
            <h2>Yeni Çıkanlar</h2>
            <BookList books={books} addToCart={addToCart} />
        </div>
    );
};

export default NewReleases;