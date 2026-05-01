import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="navbar">
            {/* Left: Nav Links */}
            <div className="nav-links">
                {user && (
                    <div className="user-menu">
                        <i className="fas fa-user-circle"></i>
                        <span>أهلاً، {user.name.split(' ')[0]}</span>
                        {user.role === 'admin' && (
                            <Link to="/admin" style={{ color: '#fff', background: '#e67e22', padding: '3px 10px', borderRadius: '16px', fontSize: '0.78rem' }}>
                                <i className="fas fa-tachometer-alt" style={{ marginLeft: '4px' }}></i>
                                لوحة التحكم
                            </Link>
                        )}
                        <button className="btn-icon" onClick={logout} title="تسجيل الخروج">
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                )}
                {!user && (
                    <Link to="/login" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
                        <i className="fas fa-sign-in-alt"></i> تسجيل الدخول
                    </Link>
                )}
                <Link to="/cart"><i className="fas fa-shopping-cart"></i> السلة</Link>
                {user && <Link to="/orders"><i className="fas fa-receipt"></i> حسابي</Link>}
                <Link to="/shop"><i className="fas fa-store"></i> المنتجات</Link>
                <Link to="/"><i className="fas fa-home"></i> الرئيسية</Link>
            </div>

            {/* Right: Logo */}
            <div className="logo">
                <Link to="/">
                    <span className="logo-icon">✨</span> متجري
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
