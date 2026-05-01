import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const statusMap = {
    completed:  { label: 'مكتمل',        color: '#16a34a', bg: '#dcfce7' },
    pending:    { label: 'قيد الانتظار', color: '#b45309', bg: '#fef3c7' },
    processing: { label: 'قيد المعالجة', color: '#1e40af', bg: '#dbeafe' },
    cancelled:  { label: 'ملغي',         color: '#dc2626', bg: '#fee2e2' },
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        api.get('/orders')
            .then(res => setOrders(res.data.data.orders ?? []))
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    }, []);

    if (!user) return (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <i className="fas fa-lock" style={{ fontSize: '3rem', color: '#1a3a5c', display: 'block', marginBottom: '16px' }}></i>
            <p style={{ color: '#6b7c93', marginBottom: '20px' }}>يجب تسجيل الدخول لعرض طلباتك</p>
            <Link to="/login" className="btn-primary"><i className="fas fa-sign-in-alt"></i> تسجيل الدخول</Link>
        </div>
    );

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#6b7c93' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}></i>
            جاري التحميل...
        </div>
    );

    return (
        <div style={{ maxWidth: '860px' }}>
            <h2 className="section-title"><i className="fas fa-receipt"></i> طلباتي</h2>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '18px', border: '1px solid #dce6ef' }}>
                    <i className="fas fa-box-open" style={{ fontSize: '3.5rem', color: '#dce6ef', display: 'block', marginBottom: '16px' }}></i>
                    <p style={{ color: '#6b7c93', marginBottom: '20px' }}>لا توجد طلبات حتى الآن</p>
                    <Link to="/shop" className="btn-primary"><i className="fas fa-store"></i> ابدأ التسوق</Link>
                </div>
            ) : (
                orders.map(order => {
                    const st = statusMap[order.status] || statusMap.pending;
                    const total = parseFloat(order.total_price).toFixed(0);
                    return (
                        <div key={order.id} style={{
                            background: '#fff', borderRadius: '18px', border: '1px solid #dce6ef',
                            padding: '20px 24px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(26,58,92,0.06)'
                        }}>
                            {/* Order Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div>
                                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#1a3a5c' }}>
                                        طلب #{order.id}
                                    </span>
                                    <span style={{ marginRight: '14px', color: '#6b7c93', fontSize: '0.85rem' }}>
                                        {order.created_at?.split('T')[0]}
                                    </span>
                                </div>
                                <span style={{
                                    background: st.bg, color: st.color,
                                    padding: '5px 14px', borderRadius: '20px',
                                    fontWeight: 700, fontSize: '0.82rem'
                                }}>
                                    {st.label}
                                </span>
                            </div>

                            {/* Order Items */}
                            {order.items?.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    padding: '8px 0', borderBottom: '1px solid #f0f4f8',
                                    fontSize: '0.9rem'
                                }}>
                                    <span style={{ fontWeight: 600 }}>{item.product?.name}</span>
                                    <span style={{ color: '#6b7c93' }}>
                                        {parseFloat(item.price).toFixed(0)} ج.م × {item.quantity}
                                        <span style={{ fontWeight: 700, color: '#e67e22', marginRight: '10px' }}>
                                            = {(parseFloat(item.price) * item.quantity).toFixed(0)} ج.م
                                        </span>
                                    </span>
                                </div>
                            ))}

                            {/* Order Total */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
                                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1a3a5c' }}>
                                    الإجمالي:&nbsp;
                                    <span style={{ color: '#e67e22', fontSize: '1.15rem' }}>{total} ج.م</span>
                                </span>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Orders;
