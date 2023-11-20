import { useContext } from "react";
import Button from "../components/Button/Button";
import ProductsList from "../components/ProductsList/ProductsList";
import { ItemsContext } from "../contexts/ItemsContext";

function CustomerPage({ products, formatPrice }) {

    const { items } = useContext(ItemsContext);

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
            <h2>Produits</h2>
            <ProductsList products={products} formatPrice={formatPrice} />
            <br />
            <Button text="Commander" functionButton={checkOutCart} disabled={items.length === 0} />
        </>
    );
}

export default CustomerPage;