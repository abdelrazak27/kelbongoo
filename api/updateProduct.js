import connectToDB from "../src/utils/db";

export default function handler(req, res) {
    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end('Method Not Allowed');
    }
    
    const { id, stockPurchased } = req.body;

    const connection = connectToDB();

    // On récupère l'ancienne valeur, et on y ajoute la quantité commandé lors de la commande qui a exécuté la requête
    const query = `UPDATE products SET stock_ordered = stock_ordered + ? WHERE id = ?`;

    connection.query(query, [stockPurchased, id], (error, results) => {
        if (error) {
            connection.end();
            return res.status(500).json({ error: error.message });
        }
        
        if (results.affectedRows === 0) {
            connection.end();
            return res.status(404).json({ message: 'Aucun élément correspondant à mettre à jour' });
        }

        connection.end();
        return res.status(200).json({ message: 'Quantité mise à jour avec succès' });
    });
}