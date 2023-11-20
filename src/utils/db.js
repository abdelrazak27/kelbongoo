import mysql from 'mysql';

// A stocker dans des variables d'environnement côté serveur de préférence pour plus de protection (Vercel offre 12 fichiers dans /api/* possible dans sa version gratuite, donc impossible à ce niveau du projet)
// L'idée est que les informations ne doivent pas être côté client (visible pas l'utilisateur)
// Cependant, il s'agit d'un test, mais je suis bien conscient du problème de sécurité de faire de cette façon

// autre solution : laisser la répition dans chacun des fichiers API en y indiquant les informations avec process.env.XXX
const config = {
    host: 'mysql-kelbongoo.alwaysdata.net',
    user: 'kelbongoo',
    password: '@KELbonGOO.132',
    database: 'kelbongoo_datas'
};

const connectToDB = () => {
    return mysql.createConnection(config);
};

export default connectToDB;
