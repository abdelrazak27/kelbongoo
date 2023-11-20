import useProduct from '../../hooks/useProduct';
import Button from '../Button/Button';
import styles from './AdminForm.module.css';

function AdminForm({ fetchProducts }) {
    const { product, setProduct } = useProduct(); // produit à ajouter (hook)

    // Changement dans le formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value }); // évite davoir un setter pour chaque élément du produit, on va chercher dans l'objet, ce qu'on souhaite modifier
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            name: product.name,
            price_ht: parseFloat(product.priceHT),
            tax_rate: parseFloat(product.taxRate),
            stock_maximum_available: parseInt(product.stockMaximumAvailable),
            stock_ordered: parseInt(product.stockOrdered),
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


    return (
        <div className={styles.adminFormContainer}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" className={styles.adminFormLabel}>Nom du produit</label>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Nom du produit"
                    autoComplete='off'
                    className={styles.adminFormInput}
                    required
                />
                <label htmlFor="priceHT" className={styles.adminFormLabel}>Prix HT</label>
                <input
                    type="number"
                    name="priceHT"
                    value={product.priceHT}
                    onChange={handleInputChange}
                    placeholder="Prix HT"
                    step="0.01"
                    min="0"
                    autoComplete='off'
                    className={styles.adminFormInput}
                    required
                />
                <label htmlFor="taxRate" className={styles.adminFormLabel}>Taxe</label>
                <select
                    name="taxRate"
                    value={product.taxRate}
                    onChange={handleInputChange}
                    className={styles.adminFormSelect}
                >
                    <option value={0.20}>20%</option>
                    <option value={0.055}>5.5%</option>
                </select>
                <label htmlFor="stockOrdered" className={styles.adminFormLabel}>Stock commandé</label>
                <input
                    type="number"
                    name="stockOrdered"
                    value={product.stockOrdered}
                    onChange={handleInputChange}
                    placeholder="Stock commandé"
                    min="0"
                    autoComplete='off'
                    className={styles.adminFormInput}
                    required
                />
                <label htmlFor="stockMaximumAvailable" className={styles.adminFormLabel}>Stock maximum disponible</label>
                <input
                    type="number"
                    name="stockMaximumAvailable"
                    value={product.stockMaximumAvailable}
                    onChange={handleInputChange}
                    placeholder="Stock maximum disponible"
                    min="0"
                    autoComplete='off'
                    className={styles.adminFormInput}
                    required
                />
                <Button type="submit" text="Ajouter le produit" />
            </form>
        </div>
    )
}

export default AdminForm