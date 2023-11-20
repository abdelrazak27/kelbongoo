import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState({
        id: "",
        checked_out: false,
    });

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};