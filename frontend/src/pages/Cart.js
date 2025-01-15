import React from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate(); // useNavigate hook doğru tanımlandı
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Sepetiniz</h2>
            {cartItems.length === 0 ? (
                <p>Sepetiniz boş.</p>
            ) : (
                <div>
                    <ul className="cart-items">
                        {cartItems.map((item, index) => (
                            <li key={index} className="cart-item">
                                <img
                                    src={item.coverImage || 'default-cover.jpg'}
                                    alt={item.title}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-details">
                                    <h3>{item.title}</h3>
                                    <p>Yazar: {item.author}</p>
                                    <p>Fiyat: {item.price} TL</p>
                                    <div className="quantity-container">
                                        <button
                                            onClick={() => updateQuantity(index, -1)}
                                            disabled={item.quantity === 1}
                                        >
                                            -
                                        </button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(index, 1)}>+</button>
                                    </div>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Kaldır
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="cart-total">Toplam Tutar: {total.toFixed(2)} TL</h3>
                    <button
                        className="checkout-button"
                        onClick={() => navigate("/checkout")} // Doğru yönlendirme
                    >
                        Ödeme Yap
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
