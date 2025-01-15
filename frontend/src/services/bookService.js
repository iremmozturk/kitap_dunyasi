import axios from 'axios';

export const fetchBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/books'); // Portu kontrol edin
        return response.data;
    } catch (error) {
        console.error("Kitaplar alınırken hata oluştu:", error);
        throw error;
    }
};