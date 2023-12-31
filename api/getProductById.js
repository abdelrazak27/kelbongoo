import connectToDB from '../src/utils/db';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "L'ID du produit est requis" });
        }

        const connection = connectToDB();

        connection.connect();

        connection.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
            if (error) {
                connection.end();
                return res.status(500).json({ error });
            }

            connection.end();
            if (results.length === 0) {
                return res.status(404).json({ message: 'Produit non trouvé' });
            }
            return res.status(200).json(results[0]);
        });
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}