import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // CSS dosyası

const Checkout = ({ cartItems }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !address || !cardNumber) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        alert("Ödeme başarılı! Siparişiniz alındı.");
        navigate("/"); // Ödeme başarılı olduğunda anasayfaya yönlendirme
    };

    return (
        <div className="checkout-container">
            <h2>Ödeme Sayfası</h2>
            <div className="checkout-summary">
                <h3>Sipariş Özeti</h3>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="checkout-item">
                            <span>{item.title}</span>
                            <span>{item.quantity} x {item.price} TL</span>
                        </li>
                    ))}
                </ul>
                <h3 className="checkout-total">Toplam Tutar: {total.toFixed(2)} TL</h3>
            </div>
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h3>Ödeme Bilgileri</h3>
                <div className="form-group">
                    <label>Ad ve Soyad</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Adınızı ve soyadınızı giriniz"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Adres</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Adresinizi giriniz"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Kredi Kartı Numarası</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="16 haneli kredi kartı numarasını giriniz"
                        required
                    />
                </div>
                <button type="submit" className="checkout-button">Ödemeyi Tamamla</button>
            </form>
        </div>
    );
};

export default Checkout;
