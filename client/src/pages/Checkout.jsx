import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="checkout-page">
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <i className="fas fa-shopping-cart" style={{ fontSize: '3rem', color: '#dce6ef', display: 'block', marginBottom: '16px' }}></i>
                    <p style={{ color: '#6b7c93', marginBottom: '20px' }}>سلة التسوق فارغة</p>
                    <Link to="/shop" className="btn-primary"><i className="fas fa-store"></i> تسوق الآن</Link>
                </div>
            </div>
        );
    }

    const total = cart.items.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);

    const handleCheckout = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/checkout');
            clearCart();
            navigate('/orders');
        } catch (err) {
            setError(err.response?.data?.message || 'فشل إتمام الطلب، حاول مجدداً');
        }
        setLoading(false);
    };

    return (
        <div className="checkout-page">
            <h2 className="section-title"><i className="fas fa-credit-card"></i> إتمام الطلب</h2>

            {error && (
                <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px' }}>
                    <i className="fas fa-exclamation-circle"></i> {error}
                </div>
            )}

            <div className="checkout-summary">
                <h3 style={{ marginBottom: '16px', fontSize: '1.1rem', color: '#6b7c93' }}>
                    <i className="fas fa-receipt"></i> ملخص الطلب
                </h3>

                {cart.items.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #dce6ef' }}>
                        <span style={{ fontWeight: 600 }}>{item.product.name} × {item.quantity}</span>
                        <span style={{ color: '#e67e22', fontWeight: 700 }}>{(parseFloat(item.product.price) * item.quantity).toFixed(0)} ج.م</span>
                    </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #1a3a5c' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>الإجمالي</span>
                    <span style={{ color: '#e67e22', fontWeight: 800, fontSize: '1.3rem' }}>{total.toFixed(0)} ج.م</span>
                </div>

                <button
                    className="btn-primary"
                    onClick={handleCheckout}
                    disabled={loading}
                    style={{ width: '100%', marginTop: '24px', padding: '14px', borderRadius: '12px', fontSize: '1rem' }}
                >
                    <i className="fas fa-check-circle"></i>
                    {loading ? 'جاري تأكيد الطلب...' : 'تأكيد الطلب'}
                </button>

                <Link to="/cart" style={{ display: 'block', textAlign: 'center', marginTop: '12px', color: '#6b7c93', fontSize: '0.9rem' }}>
                    <i className="fas fa-arrow-right"></i> العودة للسلة
                </Link>
            </div>
        </div>
    );
};

export default Checkout;
