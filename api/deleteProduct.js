import connectToDB from "../src/utils/db";

export default function handler(req, res) {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end('Method Not Allowed');
    }
    
    const { id } = req.body;

    const connection = connectToDB();

    const query = `DELETE FROM products WHERE id = ?`;

    connection.query(query, [id], (error, results) => {
        if (error) {
            connection.end();
            return res.status(500).json({ error: error.message });
        }
        
        if (results.affectedRows === 0) {
            connection.end();
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        connection.end();
        return res.status(200).json({ message: 'Product supprimé avec succès' });
    });
}
