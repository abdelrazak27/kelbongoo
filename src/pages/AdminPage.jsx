import AdminForm from '../components/AdminForm/AdminForm';
import AdminList from '../components/AdminList/AdminList';

function AdminPage({ fetchProducts, products, formatPrice }) {

    return (
        <div>
            <h2>Ajouter un produit</h2>
            <AdminForm fetchProducts={fetchProducts} />
            <h2>Produits</h2>
            <AdminList products={products} fetchProducts={fetchProducts} formatPrice={formatPrice} />
        </div>
    );
}

export default AdminPage;