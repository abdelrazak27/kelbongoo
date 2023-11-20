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
                </>
            ) : (
                <p>Aucun produit à afficher.</p>
            )}
        </>
    )
}

export default ProductsList