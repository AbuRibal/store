import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const { user, loading: authLoading } = useContext(AuthContext);

    // Load cart from server whenever user changes
    useEffect(() => {
        if (!authLoading && user) {
            // Fetch current cart by adding 0 quantity (or use a dedicated GET endpoint if available)
            // For now we rely on addToCart to populate cart on first action.
            // If you add GET /cart later, fetch it here.
        } else if (!user) {
            setCart(null);
        }
    }, [user, authLoading]);

    const addToCart = async (productId, quantity) => {
        if (!user) {
            alert('يجب تسجيل الدخول أولاً لإضافة منتجات إلى السلة');
            return;
        }
        try {
            const res = await api.post('/cart', { product_id: productId, quantity });
            setCart(res.data.data.cart);
        } catch (error) {
            const msg = error.response?.data?.message || 'فشل إضافة المنتج إلى السلة';
            alert(msg);
            console.error(error);
        }
    };

    const clearCart = () => setCart(null);

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
