import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerPage from './pages/CustomerPage';
import AdminPage from './pages/AdminPage';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]); // liste des produits existants

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
    fetchProducts();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CustomerPage />} />
          <Route path="/admin" element={<AdminPage fetchProducts={fetchProducts} products={products} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;