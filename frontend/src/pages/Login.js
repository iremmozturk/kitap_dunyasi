import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Giriş yapma fonksiyonu
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); // Token saklama
                alert('Giriş başarılı!');
                if (response.data.role === 'admin') {
                    navigate('/admin'); // Admin sayfasına yönlendirme
                } else {
                    navigate('/'); // Ana sayfaya yönlendirme
                }
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Hatalı şifre!');
                } else if (error.response.status === 404) {
                    alert('Kullanıcı bulunamadı!');
                } else {
                    alert('Giriş sırasında bir hata oluştu.');
                }
            } else {
                alert('Sunucuya bağlanılamadı!');
            }
        } finally {
            setLoading(false);
        }
    };

    // Kayıt olma fonksiyonu
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            if (response.status === 201) {
                alert('Kayıt başarılı!');
                setIsRegistering(false); // Kayıt sonrası giriş formuna dön
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert('Bu e-posta zaten kayıtlı!');
                } else {
                    alert('Kayıt sırasında bir hata oluştu.');
                }
            } else {
                alert('Sunucuya bağlanılamadı!');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {loading ? (
                <p>Yükleniyor...</p>
            ) : isRegistering ? (
                <div className="register">
                    <h2>Üye Kayıt</h2>
                    <form onSubmit={handleRegister}>
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
                    <button onClick={() => setIsRegistering(false)}>Giriş Yap</button>
                </div>
            ) : (
                <div className="user-login">
                    <h2>Üye Girişi</h2>
                    <form onSubmit={handleLogin}>
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
                        <button type="submit">Giriş Yap</button>
                    </form>
                    <button onClick={() => setIsRegistering(true)}>Kayıt Ol</button>
                </div>
            )}
        </div>
    );
};

export default Login;
