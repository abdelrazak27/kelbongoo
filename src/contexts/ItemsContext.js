import { createContext, useState } from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);

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
        <ItemsContext.Provider value={{ items, setItems, total_ttc }}>
            {children}
        </ItemsContext.Provider>
    );
};