import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'بيانات الدخول غير صحيحة');
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>تسجيل الدخول</h2>
                <p>مرحباً بعودتك! أدخل بياناتك للمتابعة</p>
                {error && (
                    <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.9rem' }}>
                        <i className="fas fa-exclamation-circle"></i> {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary" disabled={loading}>
                        <i className="fas fa-sign-in-alt"></i>
                        {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
                    </button>
                </form>
                <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#6b7c93' }}>
                    ليس لديك حساب؟ <Link to="/register" style={{ color: '#1a3a5c', fontWeight: 700 }}>إنشاء حساب</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
