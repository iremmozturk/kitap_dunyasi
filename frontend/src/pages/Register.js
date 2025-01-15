import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Aynı stil dosyasını kullanabilirsiniz

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            alert('Kayıt başarılı');
            console.log('Kayıt olan kullanıcı:', response.data);
        } catch (error) {
            console.error('Kayıt hatası:', error);
            alert('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
        }
    };

    return (
        <div className="login-container">
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ad - Soyad"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="E-posta adresinizi giriniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Şifrenizi giriniz"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Kayıt Ol</button>
            </form>
        </div>
    );
};

export default Register;
