import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// Map product names to Font Awesome icons
const getProductIcon = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('سماع') || lower.includes('headph') || lower.includes('audio')) return 'fa-headphones';
    if (lower.includes('ساعة') || lower.includes('watch')) return 'fa-clock';
    if (lower.includes('هاتف') || lower.includes('phone')) return 'fa-mobile-alt';
    if (lower.includes('حقيبة') || lower.includes('bag')) return 'fa-shopping-bag';
    if (lower.includes('شاحن') || lower.includes('charger')) return 'fa-bolt';
    if (lower.includes('باور') || lower.includes('power') || lower.includes('بطارية')) return 'fa-battery-full';
    if (lower.includes('كاميرا') || lower.includes('camera')) return 'fa-camera';
    if (lower.includes('لاب') || lower.includes('laptop')) return 'fa-laptop';
    return 'fa-box-open';
};

const Home = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        api.get('/products').then(res => {
            const raw = res.data.data.products;
            setProducts((raw.data ?? raw).slice(0, 8));
        }).catch(() => { });
    }, []);

    return (
        <div>
            {/* Hero */}
            <div className="hero">
                <h1>🛍️ مرحباً بك في متجري</h1>
                <p>اكتشف أحدث المنتجات بأفضل الأسعار وأسرع توصيل</p>
                <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', margin: '0 auto' }}>
                    <i className="fas fa-store"></i> تسوق الآن
                </Link>
            </div>

            {/* Latest Products */}
            <h2 className="section-title">
                <i className="fas fa-fire"></i> أحدث المنتجات
            </h2>
            <div className="product-grid">
                {products.map(p => (
                    <div key={p.id} className="product-card">
                        <div className="product-image-placeholder">
                            <i className={`fas ${getProductIcon(p.name)}`}></i>
                        </div>
                        <div className="product-card-body">
                            <h3>{p.name}</h3>
                            <p className="price">{parseFloat(p.price).toFixed(0)} ج.م</p>
                            <button
                                className="btn-primary"
                                onClick={() => addToCart(p.id, 1)}
                                disabled={p.stock < 1}
                            >
                                <i className="fas fa-shopping-cart"></i>
                                {p.stock < 1 ? 'نفذ من المخزون' : 'أضف إلى السلة'}
                            </button>
                        </div>
                    </div>
                ))}
                {products.length === 0 && (
                    <p style={{ color: '#999', padding: '40px 0' }}>جاري تحميل المنتجات...</p>
                )}
            </div>
        </div>
    );
};

export default Home;
