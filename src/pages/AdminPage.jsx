import { useEffect, useState } from 'react';
import useProduct from '../hooks/useProduct';

function AdminPage() {
    const { product, setProduct, calculateTTC, calculateRemainingStock } = useProduct(); // produit à ajouter (hook)
    const [products, setProducts] = useState([]); // liste des produits existants

    // Changement dans le formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value }); // évite davoir un setter pour chaque élément du produit, on va chercher dans l'objet, ce qu'on souhaite modifier
    };

    const fetchProducts = () => {
        fetch('/api/getProducts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProducts(data.products))
            .catch(error => console.error('Error fetching data:', error));
    }

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name: product.name,
            price_ht: parseFloat(product.priceHT),
            tax_rate: parseFloat(product.taxRate),
            price_ttc: parseFloat(calculateTTC()),
            stock_maximum_available: parseInt(product.stockMaximumAvailable),
            stock_ordered: parseInt(product.stockOrdered),
            stock_available: parseInt(calculateRemainingStock()),
        };
    
        // ajout dans la base de données
        try {
            const response = await fetch('/api/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            console.log('Product added:', result);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDelete = async (productID) => {
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
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Liste des produits</h2>
            {products.length > 0 ? (
                <ul>
                    {/* affichage temporaire */}
                    {products.map((productItem) => (
                        <li key={productItem.id}>
                            {productItem.name} ({productItem.id})<br/>Prix HT: {productItem.price_ht}€
                            <br/>Pourcentages taxes: {productItem.tax_rate *100}%
                            <br/>Prix TTC: {productItem.price_ttc}€
                            <br/>Stock max: {productItem.stock_maximum_available}
                            <br/>Stock actuel: {productItem.stock_available}
                            <br/>Déjà acheté: {productItem.stock_ordered}
                            <br/><button onClick={() => handleDelete(productItem.id)}>Supprimer</button>
                            <hr/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun produit à afficher.</p>
            )}
            <h2>Ajouter un produit</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Nom du produit"
                    required
                />
                <input
                    type="number"
                    name="priceHT"
                    value={product.priceHT}
                    onChange={handleInputChange}
                    placeholder="Prix HT"
                    step="0.01"
                    min="0"
                    required
                />
                <select
                    name="taxRate"
                    value={product.taxRate}
                    onChange={handleInputChange}
                >
                    <option value={0.20}>20%</option>
                    <option value={0.055}>5.5%</option>
                </select>
                <input
                    type="number"
                    name="stockOrdered"
                    value={product.stockOrdered}
                    onChange={handleInputChange}
                    placeholder="Stock commandé"
                    min="0"
                    required
                />
                <input
                    type="number"
                    name="stockMaximumAvailable"
                    value={product.stockMaximumAvailable}
                    onChange={handleInputChange}
                    placeholder="Stock maximum disponible"
                    min="0"
                    required
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>    
    );
}

export default AdminPage;