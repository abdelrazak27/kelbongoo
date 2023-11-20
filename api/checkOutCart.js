import mysql from 'mysql';

export default function handler(req, res) {
    if (req.method !== 'PUT') {
        res.setHeader('Allow', ['PUT']);
        return res.status(405).end('Method Not Allowed');
    }
    
    const { cartId } = req.body;

    const connection = mysql.createConnection({
        host: 'mysql-kelbongoo.alwaysdata.net',
        user: 'kelbongoo',
        password: '@KELbonGOO.132',
        database: 'kelbongoo_datas'
    });

    const query = `UPDATE carts SET checked_out = 1 WHERE id = ?`;

    connection.query(query, [cartId], (error, results) => {
        if (error) {
            connection.end();
            return res.status(500).json({ error: error.message });
        }
        
        if (results.affectedRows === 0) {
            connection.end();
            return res.status(404).json({ message: 'Aucun élément correspondant à mettre à jour' });
        }

        connection.end();
        return res.status(200).json({ message: 'Panier mise à jour avec succès' });
    });
}
