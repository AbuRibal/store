import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Orders from '../pages/Orders';
import DashboardHome from '../pages/dashboard/DashboardHome';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Storefront */}
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="product/:id" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="orders" element={<Orders />} />
                </Route>

                {/* Admin Dashboard – full width, no store navbar */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<DashboardHome />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

