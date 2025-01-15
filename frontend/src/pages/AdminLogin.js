import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Admin giriş fonksiyonu
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/admin/login", { email, password });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token); // Token'ı localStorage'da sakla
                alert("Giriş başarılı!");
                navigate("/admin-panel"); // Admin paneline yönlendir
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert("Hatalı şifre!");
                } else if (error.response.status === 404) {
                    alert("Admin bulunamadı!");
                } else {
                    alert("Giriş sırasında bir hata oluştu.");
                }
            } else {
                alert("Sunucuya bağlanılamadı!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div className="admin-login">
                    <h2>Admin Girişi</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-posta adresinizi giriniz"
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Şifrenizi giriniz"
                            required
                        />
                        <button type="submit">Giriş Yap</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
