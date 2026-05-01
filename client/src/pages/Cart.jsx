import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="cart-page empty">
                <i className="fas fa-lock" style={{ fontSize: '3rem', color: '#1a3a5c', marginBottom: '16px', display: 'block' }}></i>
                <h2>سجّل دخولك أولاً</h2>
                <p style={{ color: '#6b7c93', marginBottom: '20px' }}>يجب تسجيل الدخول لعرض سلة التسوق</p>
                <Link to="/login" className="btn-primary">
                    <i className="fas fa-sign-in-alt"></i> تسجيل الدخول
                </Link>
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="cart-page empty">
                <i className="fas fa-shopping-cart" style={{ fontSize: '3.5rem', color: '#dce6ef', marginBottom: '16px', display: 'block' }}></i>
                <h2>سلة التسوق فارغة</h2>
                <p style={{ color: '#6b7c93', marginBottom: '20px' }}>لم تضف أي منتجات بعد</p>
                <Link to="/shop" className="btn-primary">
                    <i className="fas fa-store"></i> تسوق الآن
                </Link>
            </div>
        );
    }

    const removeItem = async (itemId) => {
        try {
            await api.delete(`/cart/${itemId}`);
            const updated = { ...cart, items: cart.items.filter(i => i.id !== itemId) };
            setCart(updated.items.length ? updated : null);
        } catch (e) { console.error(e); }
    };

    const total = cart.items.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

    return (
        <div className="cart-page">
            <h2 className="section-title"><i className="fas fa-shopping-cart"></i> سلة التسوق</h2>

            {cart.items.map(item => (
                <div key={item.id} className="cart-item">
                    <div className="item-info">
                        <h4>{item.product.name}</h4>
                        <p>{parseFloat(item.product.price).toFixed(0)} ج.م × {item.quantity}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div className="item-total">{(parseFloat(item.product.price) * item.quantity).toFixed(0)} ج.م</div>
                        <button
                            onClick={() => removeItem(item.id)}
                            style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.85rem' }}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            ))}

            <div className="cart-summary">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{ color: '#6b7c93', fontSize: '0.95rem' }}>إجمالي ({cart.items.length} منتج)</span>
                    <h3 style={{ color: '#e67e22', fontSize: '1.4rem' }}>{total.toFixed(0)} ج.م</h3>
                </div>
                <button className="btn-primary" style={{ width: '100%', borderRadius: '12px', padding: '14px', fontSize: '1rem' }} onClick={() => navigate('/checkout')}>
                    <i className="fas fa-credit-card"></i> إتمام الشراء
                </button>
                <Link to="/shop" style={{ display: 'block', textAlign: 'center', marginTop: '12px', color: '#6b7c93', fontSize: '0.9rem' }}>
                    <i className="fas fa-arrow-right"></i> متابعة التسوق
                </Link>
            </div>
        </div>
    );
};

export default Cart;
