import { useState } from "react";

const useItem = () => {
    const [items, setItems] = useState([]);

    // ajouter un produit dans le panier
    const addItem = (cartId, productId, quantity) => {
        const newItem = { cart_id: cartId, product_id: productId, quantity };
        setItems([...items, newItem]);
    };

    return { items, setItems, addItem };
}

export default useItem;