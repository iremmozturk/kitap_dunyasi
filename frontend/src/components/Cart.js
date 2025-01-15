import React from "react";
import "./Cart.css"; // Yukarıdaki CSS'i bu dosyaya bağlayın

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                                <img src={item.coverImage} alt={item.title} />
                                <div className="cart-item-details">
                                    <h3>{item.title}</h3>
                                    <p>Yazar: {item.author}</p>
                                    <p>Fiyat: {item.price} TL</p>
                                    <div className="cart-buttons">
                                        <button onClick={() => updateQuantity(index, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => removeFromCart(index)}>Kaldır</button>
                            </li>
                        ))}
                    </ul>
                    <h3 className="cart-total">Toplam Tutar: {total.toFixed(2)} TL</h3>
                    <button className="checkout-button" onClick={() => alert("Ödeme sayfasına yönlendiriliyorsunuz!")}>
                        Ödeme Yap
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
