import { createContext, useCallback, useContext, useState } from 'react';
import useProduct from '../hooks/useProduct';
import { v4 as uuidv4 } from 'uuid';
import { ItemsContext } from './ItemsContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        id: "",
        checked_out: false,
    });
    const { calculateTTC } = useProduct();
    const { setItems } = useContext(ItemsContext);
    
    // Méthode pour créer le panier côté serveur
    const createCart = async (cartID) => {
        try {
            const response = await fetch('/api/createCart', { // appel API création du panier
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: cartID }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Panier ajouté:', result);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du panier:', error);
        }
    };

    // Fonction pour récupérer les items du panier existant qui revient sur la vue (utilisé dans la méthode getCart)
    // Retourne un tableau d'item
    const fetchItemsCart = async (cartId) => {
        const response = await fetch(`/api/getItemsByCart?cartId=${encodeURIComponent(cartId)}`); // appel API récupérations des items depuis l'ID du panier
        const items = await response.json();
        return items;
    };

    // Méthode qui récupère le panier du visiteur
    const getCart = async (cartID) => {
        const response = await fetch(`/api/getCartById?id=${encodeURIComponent(cartID)}`); // appel API récupération du panier depuis l'ID du panier
        const responseCart = await response.json();
        // Si le panier trouvé est checked_out (true), on en crée un nouveau dans le même principe que dans App.js
        if(responseCart.checked_out) {
            const newCartID = uuidv4();
            localStorage.setItem('cartID', newCartID);
            await createCart(newCartID);
            setCart({ id: newCartID, checked_out: false });
        } else {
            // Sinon, on récupère et stock les données du panier existant.
            setCart({ id: responseCart.id, checked_out: false });
            const itemsCart = await fetchItemsCart(responseCart.id); // on récupère les items pour les remettre dans "items"
            setItems(itemsCart);
        }
    };

    // Fonction qui retourne le prix TTC d'un produit, utilisé dans la fonction total_ttc()
    const fetchPriceTTC = async (productId) => {
        const response = await fetch(`/api/getProductById?id=${encodeURIComponent(productId)}`); // appel API récupération d'un produit depuis son product ID
        const product = await response.json();
        return calculateTTC(product.price_ht, product.tax_rate);
    };

    // Calcul du total TTC de la commande, fonctionne avec fetchPriceTTC
    const total_ttc = useCallback(async (items) => {
        let total = 0;
        for (const item of items) {
            const price_ttc = await fetchPriceTTC(item.product_id);
            total += item.quantity * price_ttc;
        }
        return total;
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart, total_ttc, createCart, getCart }}>
            {children}
        </CartContext.Provider>
    );
};