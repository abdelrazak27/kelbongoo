import mysql from 'mysql';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "L'ID du panier est requis" });
        }

        const connection = mysql.createConnection({
            host: 'mysql-kelbongoo.alwaysdata.net',
            user: 'kelbongoo',
            password: '@KELbonGOO.132',
            database: 'kelbongoo_datas'
        });

        connection.connect();

        connection.query('SELECT * FROM carts WHERE id = ?', [id], (error, results) => {
            if (error) {
                connection.end();
                return res.status(500).json({ error });
            }

            connection.end();
            if (results.length === 0) {
                return res.status(404).json({ message: 'Panier non trouvé' });
            }
            return res.status(200).json(results[0]);
        });
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}