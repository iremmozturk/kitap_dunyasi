import React, { useState, useEffect } from 'react';
import axios from 'axios';
import searchImage from '../assets/search-icon.png'; // Doğru dosya yolunu kontrol edin

const SearchBar = ({ setBooks }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            if (!searchTerm.trim()) {
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/books?search=${searchTerm}`);
                setBooks(response.data);
            } catch (error) {
                console.error('Arama sırasında hata oluştu:', error);
            }
        };

        const debounceTimeout = setTimeout(() => {
            fetchBooks();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm, setBooks]);

    return (
        <div style={styles.container}>
            <input
                type="text"
                placeholder="Kitap arayın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
            />
            <button style={styles.button}>
                <img src={searchImage} alt="Search" style={styles.icon} />
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '60%',
        padding: '10px',
        border: '2px solid #553c9a',
        borderRadius: '25px 0 0 25px',
        fontSize: '16px',
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        backgroundColor: '#553c9a',
        color: 'white',
        borderRadius: '0 25px 25px 0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: '20px',
        height: '20px',
    },
};

export default SearchBar;
