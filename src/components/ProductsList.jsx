import { useContext, useEffect, useState } from "react";
import useProduct from "../hooks/useProduct";
import { CartContext } from "../contexts/CartContext";
import { ItemsContext } from "../contexts/ItemsContext";

function ProductsList({ products }) {
    const { calculateTTC, calculateRemainingStock } = useProduct(); // on utilise les méthodes créé dans le hook de Product
    // utilisation du context pour modifier les valeurs dans la globalité de l'application
    const { items, updateItem } = useContext(ItemsContext);
    const { total_ttc } = useContext(CartContext);
    const [totalTTC, setTotalTTC] = useState(0);

    // Calcul de la quantité total
    const calculateTotalQuantity = () => {
        return items.reduce((total, item) => total + item.quantity, 0); // items ne peut pas se remplir pour le moment, il est normal que la quantité reste figé à 0
    };

    // Fonction qui retourne la quantité d'un produit choisi
    const getQuantityForProduct = (productId) => {
        const item = items.find(item => item.product_id === productId);
        return item ? item.quantity : 0;
    };

    // Rafraichissement du total de la commande en temps réel
    useEffect(() => {
        if (items) {
            const calculateTotal = async () => {
                const total = await total_ttc(items);
                setTotalTTC(total);
            };
            calculateTotal(); // items ne peut pas se remplir pour le moment, il est normal que le prix reste figé à 0
        }
    }, [items, total_ttc]);

    const handleQuantityChange = (productId, quantity) => {
        updateItem(productId, quantity);
    };

    // Fonction pour mettre à jour sotck_ordered côté serveur
    const updateProductBDD = async (productID, stockPurchased) => {
        try {
            const response = await fetch(`/api/updateProduct`, {    // appel API : maj de la quantité stock_ordered depuis l'ID du produit et la quantité commandé lors du clic
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productID, stockPurchased: stockPurchased }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Produit modifié:', result);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Fonction pour valider le panier
    const updateCartBDD = async (cartID) => {
        try {
            const response = await fetch(`/api/checkOutCart`, { // appel API : maj du checked_out à true, depuis l'ID du panier
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartId: cartID }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Panier modifié:', result);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const checkOutCart = async () => {
        // maj du stock des produits
        for (const item of items) {
            const productID = item.product_id;
            const quantity = item.quantity;
            try {
                await updateProductBDD(productID, quantity);        // MAJ de la quantité commandé d'un produit, côté serveur
            } catch (error) {
                console.error(`Erreur lors de la mise à jour du produit ${productID}:`, error);
            }
        }
        
        // mise à jour checked_out BDD
        await updateCartBDD(localStorage.getItem('cartID'));        // MAJ du panier côté serveur
        // création d'un nouveau panier en actualisant la page (géré dans le App.js qui vérifie en entrant dans la vue un panier est stocké dans le localstorage)
        window.location.reload();
    }

    return (
        <>
            {(products.length > 0) ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.name} ({product.id}) - test :</td>
                                    <td>{calculateTTC(product.price_ht, product.tax_rate)} €</td>
                                    <td>
                                        <select
                                            value={getQuantityForProduct(product.id)}   // Pour avoir la bonne quantité en revenant sur la vue et ayant déjà un panier
                                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                        >
                                            {[...Array(calculateRemainingStock(product.stock_maximum_available, product.stock_ordered) + 1).keys()].map((number) => (
                                                <option key={number} value={number}>
                                                    {number}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>TOTAL</td>
                                <td>{totalTTC}€</td>
                                <td>{calculateTotalQuantity()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={checkOutCart}>COMMANDER</button>
                </>
            ) : (
                <p>Aucun produit à afficher.</p>
            )}
        </>
    )
}

export default ProductsList