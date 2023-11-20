import mysql from 'mysql';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { id } = req.body;

        const connection = mysql.createConnection({
            host: 'mysql-kelbongoo.alwaysdata.net',
            user: 'kelbongoo',
            password: '@KELbonGOO.132',
            database: 'kelbongoo_datas'
        });

        const query = `INSERT INTO carts (id, checked_out) VALUES (?, false)`;

        connection.query(query, [id], (error, results) => {
            connection.end();
            if (error) {
                return res.status(500).json({ error });
            }
            return res.status(200).json({ message: 'Panier ajouté avec succès', cart: { id } });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}