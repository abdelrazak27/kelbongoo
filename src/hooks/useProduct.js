import { useState } from 'react';

const useProduct = () => {

    // Modèle produit avec des valeurs par défaut
    const [product, setProduct] = useState({
        name: '',
        priceHT: '',
        taxRate: 0.20, // 0.20 (par défaut) ou 0.055
        stockOrdered: '',
        stockMaximumAvailable: ''
    });

    // Calcul du prix TTC 
    const calculateTTC = (priceHT, taxRate) => {
        const priceHTFloat = parseFloat(priceHT);
        const taxRateFloat = parseFloat(taxRate);
        return (priceHTFloat + (priceHTFloat * taxRateFloat)).toFixed(2); // arrondi à 2 chiffre après la virgules
    };

    // Calcul du stock restant du produit choisi
    const calculateRemainingStock = (stockMaximumAvailable, stockOrdered) => {
        return parseInt(stockMaximumAvailable) - parseInt(stockOrdered);
    };

    return {
        product,
        setProduct,
        calculateTTC,
        calculateRemainingStock
    };
};

export default useProduct;