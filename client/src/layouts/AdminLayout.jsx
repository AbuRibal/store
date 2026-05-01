import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div>
            {/* Slim top bar linking back to store */}
            <div style={{
                background: '#1a3a5c',
                color: '#fff',
                padding: '8px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.85rem',
                direction: 'rtl'
            }}>
                <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 600 }}>
                    <i className="fas fa-cog" style={{ marginLeft: '6px' }}></i>
                    لوحة تحكم المدير
                </span>
                <Link to="/" style={{ color: '#ffb347', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
                    <i className="fas fa-store" style={{ marginLeft: '6px' }}></i>
                    العودة للمتجر
                </Link>
            </div>
            <Outlet />
        </div>
    );
};

export default AdminLayout;
