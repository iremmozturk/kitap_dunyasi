import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';

const Bestsellers = ({ addToCart }) => { // Prop olarak addToCart alındı
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books/bestsellers');
                setBooks(response.data);
            } catch (error) {
                console.error('Çok satan kitaplar yüklenemedi:', error);
            }
        };

        fetchBestsellers();
    }, []);

    return (
        <div>
            <h2>Çok Satanlar</h2>
            <BookList books={books} addToCart={addToCart} /> {/* addToCart prop olarak geçirildi */}
        </div>
    );
};

export default Bestsellers;
