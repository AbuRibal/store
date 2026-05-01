import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

const MainLayout = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <footer className="footer">
                <p>
                    <i className="fas fa-store" style={{ marginLeft: '6px', color: '#1a3a5c' }}></i>
                    © {new Date().getFullYear()} متجري — جميع الحقوق محفوظة
                </p>
            </footer>
        </div>
    );
};

export default MainLayout;
