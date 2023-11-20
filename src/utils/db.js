import mysql from 'mysql';

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
