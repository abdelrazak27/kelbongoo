import connectToDB from '../src/utils/db';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, price_ht, tax_rate, stock_maximum_available, stock_ordered } = req.body;

        const connection = connectToDB();

        const query = `INSERT INTO products (name, price_ht, tax_rate, stock_maximum_available, stock_ordered) VALUES (?, ?, ?, ?, ?)`;

        connection.query(query, [name, price_ht, tax_rate, stock_maximum_available, stock_ordered], (error, results) => {
            connection.end();
            if (error) {
                return res.status(500).json({ error });
            }
            return res.status(200).json({ message: 'Product added successfully', product: { name, price_ht, tax_rate, stock_maximum_available, stock_ordered } });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}