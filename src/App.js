import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from './contexts/CartContext';
import Header from './components/Header/Header';

function App() {
  const [products, setProducts] = useState([]); // liste des produits existants
  const [loading, setLoading] = useState(true);
  const { setCart, createCart, getCart } = useContext(CartContext);  // Utilisation du context pour modifier le panier dans la globalité de l'app

  // Fonction pour formater les prix
  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
  };

  // récupère tous les produits
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

  useEffect(() => {
    const localStorageCartID = localStorage.getItem('cartID');
    // Création du panier, si pas de panier
    if(!localStorageCartID) {
      const cartID = uuidv4();
      localStorage.setItem('cartID', cartID);       // stockage de l'ID côté client
      createCart(cartID);                           // Création du panier côté serveur
      setCart({ id: cartID, checked_out: false });  // Création du panier côté client
      setLoading(false);
    } else {
      // Récupération du panier existant
      getCart(localStorageCartID).then(() => {
        setLoading(false);
      });
    }
    fetchProducts();
    // eslint-disable-next-line
  }, []); 

  return (
    <Router>
      <Header />
      <div className="App">
        {/* Si les données de sont pas chargé, on affiche pas les vues */}
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <>
          
          <Routes>
            <Route path="/" element={<CustomerPage products={products} formatPrice={formatPrice} />} />
            <Route path="/admin" element={<AdminPage fetchProducts={fetchProducts} products={products} formatPrice={formatPrice} />} />
          </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;