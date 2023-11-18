import useProduct from '../hooks/useProduct';
import { supabase } from '../supabaseClient'; // Pour pouvoir utiliser l'API de Supabase

function AdminPage() {
    const { product, setProduct } = useProduct();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value }); // évite davoir un setter pour chaque élément du produit, on va chercher dans l'objet ce qu'on souhaite modifié
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('products')
            .insert([
                { 
                    name: product.name,
                    price_ht: parseFloat(product.priceHT),
                    tax_rate: parseFloat(product.taxRate),
                    stock_ordered: parseInt(product.stockOrdered),
                    stock_maximum_available: parseInt(product.stockMaximumAvailable)
                }
            ]);
        if (error) {
            console.error('Erreur lors de l\'ajout du produit :', error); // pour debug
        } else {
            console.log('Produit ajouté avec succès'); // pour debug
        }
    };

    return (
        <div>
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