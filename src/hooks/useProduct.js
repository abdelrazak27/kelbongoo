import { useState } from 'react';

const useProduct = () => {

    // Modèle produit avec des valeurs par défaut
    const [product, setProduct] = useState({
        name: 'product',
        priceHT: 0.00,
        taxRate: 0.20, // 0.20 (par défaut) ou 0.055
        stockOrdered: 0,
        stockMaximumAvailable: 0
    });

    // Calcul du prix TTC 
    const calculateTTC = () => {
        return (product.priceHT + (product.priceHT * product.taxRate)).toFixed(2); // arrondi à 2 chiffre après la virgules
    };

    // Calcul du stock restant du produit choisi
    const calculateRemainingStock = () => {
        return product.stockMaximumAvailable - product.stockOrdered;
    };

    return {
        product,
        setProduct,
        calculateTTC,
        calculateRemainingStock
    };
};

export default useProduct;