import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== passwordConfirmation) { setError('كلمتا المرور غير متطابقتين'); return; }
        setLoading(true);
        try {
            await register({ name, email, password, password_confirmation: passwordConfirmation });
            navigate('/');
        } catch (err) {
            setError(err.message || 'فشل إنشاء الحساب، حاول مجدداً');
        }
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>إنشاء حساب جديد</h2>
                <p>انضم إلينا واستمتع بأفضل تجربة تسوق</p>
                {error && (
                    <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.9rem' }}>
                        <i className="fas fa-exclamation-circle"></i> {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="auth-form">
                    <input type="text" placeholder="الاسم الكامل" value={name} onChange={e => setName(e.target.value)} required />
                    <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="كلمة المرور (8 أحرف على الأقل)" value={password} onChange={e => setPassword(e.target.value)} required />
                    <input type="password" placeholder="تأكيد كلمة المرور" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
                    <button type="submit" className="btn-primary" disabled={loading}>
                        <i className="fas fa-user-plus"></i>
                        {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
                    </button>
                </form>
                <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#6b7c93' }}>
                    لديك حساب بالفعل؟ <Link to="/login" style={{ color: '#1a3a5c', fontWeight: 700 }}>تسجيل الدخول</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
