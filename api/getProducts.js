import mysql from 'mysql';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const connection = mysql.createConnection({
            host: 'mysql-kelbongoo.alwaysdata.net',
            user: 'kelbongoo',
            password: '@KELbonGOO.132',
            database: 'kelbongoo_datas'
        });

        connection.connect();

        connection.query('SELECT * FROM products', (error, results) => {
            if (error) {
                connection.end();
                return res.status(500).json({ error });
            }

            connection.end();
            return res.status(200).json({ products: results });
        });
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}