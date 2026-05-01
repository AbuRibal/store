import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const getProductIcon = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('سماع') || lower.includes('headph')) return 'fa-headphones';
    if (lower.includes('ساعة') || lower.includes('watch')) return 'fa-clock';
    if (lower.includes('هاتف') || lower.includes('phone')) return 'fa-mobile-alt';
    if (lower.includes('حقيبة') || lower.includes('bag')) return 'fa-shopping-bag';
    if (lower.includes('شاحن') || lower.includes('charger')) return 'fa-bolt';
    if (lower.includes('باور') || lower.includes('power') || lower.includes('بطارية')) return 'fa-battery-full';
    if (lower.includes('كاميرا') || lower.includes('camera')) return 'fa-camera';
    if (lower.includes('لاب') || lower.includes('laptop')) return 'fa-laptop';
    return 'fa-box-open';
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [added, setAdded] = useState(false);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data.data.product))
            .catch(() => navigate('/shop'));
    }, [id, navigate]);

    if (!product) return (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b7c93' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}></i>
            جاري التحميل...
        </div>
    );

    const handleAdd = async () => {
        await addToCart(product.id, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="product-details-page">
            <div style={{ marginBottom: '20px' }}>
                <Link to="/shop" style={{ color: '#6b7c93', fontSize: '0.9rem' }}>
                    <i className="fas fa-arrow-right"></i> العودة للمنتجات
                </Link>
            </div>

            <div className="product-details-container">
                {/* Image */}
                <div className="product-image-large">
                    <i className={`fas ${getProductIcon(product.name)}`}></i>
                </div>

                {/* Info */}
                <div className="product-info">
                    {product.category && (
                        <span style={{ background: '#e8f0f7', color: '#1a3a5c', padding: '4px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600 }}>
                            {product.category.name}
                        </span>
                    )}
                    <h1 style={{ marginTop: '12px' }}>{product.name}</h1>
                    <p className="price">{parseFloat(product.price).toFixed(0)} ج.م</p>

                    {product.description && (
                        <p className="description">{product.description}</p>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                        <i className="fas fa-boxes" style={{ color: product.stock > 0 ? '#16a34a' : '#dc2626' }}></i>
                        <span style={{ color: product.stock > 0 ? '#16a34a' : '#dc2626', fontWeight: 600, fontSize: '0.9rem' }}>
                            {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'نفذ من المخزون'}
                        </span>
                    </div>

                    <button
                        className="btn-primary"
                        onClick={handleAdd}
                        disabled={product.stock < 1}
                        style={{ width: '100%', padding: '14px', borderRadius: '12px', fontSize: '1rem' }}
                    >
                        <i className={`fas ${added ? 'fa-check' : 'fa-shopping-cart'}`}></i>
                        {added ? 'تمت الإضافة!' : product.stock < 1 ? 'نفذ من المخزون' : 'أضف إلى السلة'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
