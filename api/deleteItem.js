import mysql from 'mysql';

export default function handler(req, res) {
    if (req.method !== 'DELETE') {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).end('Method Not Allowed');
    }
    
    const { productId, cartId } = req.body;
    console.log(req.body);

    const connection = mysql.createConnection({
        host: 'mysql-kelbongoo.alwaysdata.net',
        user: 'kelbongoo',
        password: '@KELbonGOO.132',
        database: 'kelbongoo_datas'
    });

    const query = `DELETE FROM items WHERE product_id = ? AND cart_id = ?`;

    connection.query(query, [productId, cartId], (error, results) => {
        if (error) {
            connection.end();
            return res.status(500).json({ error: error.message });
        }
        
        if (results.affectedRows === 0) {
            connection.end();
            return res.status(404).json({ message: 'Item non trouvé', result: results });
        }

        connection.end();
        return res.status(200).json({ message: 'Item supprimé avec succès' });
    });
}
