const mysql = require('mysql');
const util = require('util');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Aldrich',
    password: 'neil1804',
    database: 'contact',
    port: 3306,
});

const query = util.promisify(db.query).bind(db);

module.exports = {
    db,
    query,
};
