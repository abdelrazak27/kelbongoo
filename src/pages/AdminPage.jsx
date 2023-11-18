import { useEffect, useState } from 'react';
import useProduct from '../hooks/useProduct';
import { supabase } from '../supabaseClient'; // Pour pouvoir utiliser l'API de supabase

function AdminPage() {
    const { product, setProduct, calculateTTC, calculateRemainingStock } = useProduct(); // produit à ajouter (hook)
    const [products, setProducts] = useState([]); // liste des produits existants

    // Changement dans le formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value }); // évite davoir un setter pour chaque élément du produit, on va chercher dans l'objet, ce qu'on souhaite modifier
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('products')
            .insert([
                { 
                    name: product.name,
                    price_ht: parseFloat(product.priceHT),
                    tax_rate: parseFloat(product.taxRate),
                    price_ttc: parseFloat(calculateTTC()),
                    stock_ordered: parseInt(product.stockOrdered),
                    stock_maximum_available: parseInt(product.stockMaximumAvailable),
                    stock_available: parseInt(calculateRemainingStock()),
                }
            ]);
        if (error) {
            console.error('Erreur lors de l\'ajout du produit :', error); // pour debug
        } else {
            console.log('Produit ajouté avec succès'); // pour debug
            await fetchProducts();
        }
    };

    // A chaque chargement du composant/de la page, on récupère les éléments de la table "products"
    useEffect(() => {
        fetchProducts();
    }, []);

    // Récupération des produits dans la BDD
    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*');
        if (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        } else {
            setProducts(data);
        }
    };

    return (
        <div>
            <h2>Liste des produits</h2>
            <ul>
                {products.map((productItem) => (
                    <li key={productItem.id}>
                        {productItem.name}<br/>Prix HT: {productItem.price_ht}€
                        <br/>Pourcentages taxes: {productItem.tax_rate *100}%
                        <br/>Prix TTC: {productItem.price_ttc}€
                        <br/>Stock max: {productItem.stock_maximum_available}
                        <br/>Stock actuel: {productItem.stock_available}
                        <br/>Déjà acheté: {productItem.stock_ordered}

                        <hr/>
                    </li>
                ))}
            </ul>
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