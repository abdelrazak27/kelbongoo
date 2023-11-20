import connectToDB from '../src/utils/db';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { cart_id, product_id, quantity } = req.body;

        const connection = connectToDB();

        const query = `INSERT INTO items (cart_id, product_id, quantity) VALUES (?, ?, ?)`;

        connection.query(query, [cart_id, product_id, quantity], (error, results) => {
            connection.end();
            if (error) {
                return res.status(500).json({ error });
            }
            return res.status(200).json({ message: 'Item ajouté avec succès', product: { cart_id, product_id, quantity } });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}