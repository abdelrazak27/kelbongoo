import { createContext, useCallback, useState } from 'react';
import useProduct from '../hooks/useProduct';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        id: "",
        checked_out: false,
    });
    const { calculateTTC } = useProduct();
    
    const fetchPriceTTC = async (productId) => {
        const response = await fetch(`/api/getProductById?id=${encodeURIComponent(productId)}`);
        const product = await response.json();
        return calculateTTC(product.price_ht, product.tax_rate);
    };

    const total_ttc = useCallback(async (items) => {
        let total = 0;
        for (const item of items) {
            const price_ttc = await fetchPriceTTC(item.product_id);
            total += item.quantity * price_ttc;
        }
        return total;
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart, total_ttc }}>
            {children}
        </CartContext.Provider>
    );
};