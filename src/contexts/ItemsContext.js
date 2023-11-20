import { createContext, useState } from 'react';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    // Ajout de l'item côté serveur
    const addItemBDD = async (cartID, productID, quantity) => {
        try {
            const response = await fetch('/api/addItem', {  // appel API : création de l'item
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart_id: cartID, product_id: productID, quantity: quantity }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Item ajouté:', result);
        } catch (error) {
            console.error('Erreur lors de l\'ajout du panier:', error);
        }
    };

    // Suppression de l'item côté serveur
    const deleteItemBDD = async (cartID, productID) => {
        try {
            const response = await fetch(`/api/deleteItem`, {   // appel API : suppresion de l'item en fonction de l'ID du panier et de l'ID du produit
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartId: cartID, productId: productID }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Item supprimé:', result);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // MAJ de la quantité de l'item
    const updateItemBDD = async (cartID, productID, quantity) => {
        try {
            const response = await fetch(`/api/updateItem`, {   // appel API : mise à jour de la quantité de l'item dans le panier depuis l'ID du panier et l'ID du produit
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartId: cartID, productId: productID, newQuantity: quantity }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Item modifié:', result);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Méthode pour mettre à jour l'item du panier, côté client (et serveur).
    const updateItem = (productId, quantity) => {
        const localStorageCartID = localStorage.getItem('cartID');
        setItems(currentItems => {
            // Vérifier si l'item existe déjà dans le panier
            const existingItemIndex = currentItems.findIndex(item => item.product_id === productId);
            
            if (existingItemIndex >= 0) {
                // Supprimer le produit de la liste
                if (quantity === 0) {
                    deleteItemBDD(localStorageCartID, productId);           // Côté serveur
                    return currentItems.filter(item => item.product_id !== productId);  // Côté client
                }

                // Mettre à jour la quantité d'un produit
                updateItemBDD(localStorageCartID, productId, quantity);     // Côté serveur
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], quantity };
                return updatedItems;    // Côté client
            } else {
                // Ne rien faire
                if (quantity === 0) {
                    return currentItems;    // Côté client
                }

                // Ajouter le nouveau produit à la liste
                addItemBDD(localStorageCartID, productId, quantity);        // Côté serveur
                return [...currentItems, { cart_id: localStorageCartID, product_id: productId, quantity }];     // Côté client
            }
        });
    };

    return (
        <ItemsContext.Provider value={{ items, setItems, updateItem }}>
            {children}
        </ItemsContext.Provider>
    );
};