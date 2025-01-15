import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NewReleases from './pages/NewReleases';
import Bestsellers from './pages/Bestsellers';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Checkout from './pages/Checkout';

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (book) => {
        alert(`${book.title} sepete eklendi!`);
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === book._id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...book, quantity: 1 }];
        });
    };

    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const updateQuantity = (index, amount) => {
        setCart((prevCart) =>
            prevCart.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + amount } : item
            )
        );
    };

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Home addToCart={addToCart} />} />
                    <Route path="/new" element={<NewReleases addToCart={addToCart} />} />
                    <Route path="/bestsellers" element={<Bestsellers addToCart={addToCart} />} />
                    <Route
                        path="/cart"
                        element={<Cart cartItems={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/checkout" element={<Checkout cartItems={cart} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
