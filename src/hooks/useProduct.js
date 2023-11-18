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
        const priceHTFloat = parseFloat(product.priceHT);
        const taxRateFloat = parseFloat(product.taxRate);
        return (priceHTFloat + (priceHTFloat * taxRateFloat)).toFixed(2); // arrondi à 2 chiffre après la virgules
    };

    // Calcul du stock restant du produit choisi
    const calculateRemainingStock = () => {
        return parseInt(product.stockMaximumAvailable) - parseInt(product.stockOrdered);
    };

    return {
        product,
        setProduct,
        calculateTTC,
        calculateRemainingStock
    };
};

export default useProduct;