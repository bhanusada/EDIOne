var mariadb = require('mariadb');
var config = require('./config.json');

const instance = mariadb.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

var conn;

async function connection() {
    try {
        conn = await instance.getConnection();
        return conn;
    } catch(err) {
        throw err;
    }
}

async function po() {
    if(conn === undefined || conn === null || conn === '') {
        conn = await connection();
    }
    try {
        const rows = await conn.query("SELECT 1 as val");
        return rows;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    connect: connection,
    po: po
};
