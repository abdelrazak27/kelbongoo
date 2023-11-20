import { useState } from "react";
import useProduct from "../../hooks/useProduct";
import styles from "./AdminList.module.css";

function AdminList({ products, fetchProducts, formatPrice }) {

    const { calculateTTC, calculateRemainingStock } = useProduct();
    const [ loading, setLoading ] = useState(false);

    // supprimer un produit de la bdd
    const handleDelete = async (productID) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/deleteProduct`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: productID }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Product deleted:', result);
            await fetchProducts();
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error deleting product:', error);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <div className={styles.productsContainer}>
            {products.length > 0 ? (
            <table className={styles.productsTable}>
                <thead>
                    <tr>
                        <th>Nom (#ID)</th>
                        <th>Prix HT</th>
                        <th>Taxe</th>
                        <th>Prix TTC</th>
                        <th>Stock max</th>
                        <th>Stock actuel</th>
                        <th>Stock commandé</th>
                        <th><abbr title="La suppression échoue si un client possède ce produit là dans son panier." className={styles.infoIcon}>Action</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((productItem) => (
                        <tr key={productItem.id}>
                            <td>{productItem.name} (#{productItem.id})</td>
                            <td>{formatPrice(productItem.price_ht)}</td>
                            <td>{productItem.tax_rate * 100}%</td>
                            <td>{formatPrice(parseFloat(calculateTTC(productItem.price_ht, productItem.tax_rate)))}</td>
                            <td>{productItem.stock_maximum_available}</td>
                            <td>{calculateRemainingStock(productItem.stock_maximum_available, productItem.stock_ordered)}</td>
                            <td>{productItem.stock_ordered}</td>
                            <td><button onClick={() => handleDelete(productItem.id)} className={styles.deleteButton} disabled={loading}>Supprimer</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <p className="noProducts">Aucun produit à afficher.</p>
            )}            
        </div>
    )
}

export default AdminList