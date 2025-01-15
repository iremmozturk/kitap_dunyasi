import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import libraryImage from '../assets/library.png';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src={libraryImage} alt="Library" className="library-image" />
            </div>
            <div className="header-logo">
                <img src={logo} alt="KitapDünyası" className="logo-image" />
            </div>
            <div className="header-center">
                <Link to="/" className="nav-link">Ana Sayfa</Link>
                <Link to="/bestsellers" className="nav-link">Çok Satanlar</Link>
                <Link to="/new" className="nav-link">Yeni Çıkanlar</Link>
            </div>
            <div className="header-buttons">
                <Link to="/login" className="header-button login-button">Giriş Yap veya Kayıt Ol</Link>
                <Link to="/adminlogin" className="nav-link">Admin Girişi</Link>
                <Link to="/cart" className="header-button cart-button">Sepete Git</Link>
            </div>
        </header>
    );
};

export default Header;