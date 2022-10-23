const mysql = require('mysql2');

const dbConfig  = {
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    database        : 'blog',
    connectionLimit : 10
}

// const poolPromise = new mysql.createPool(dbConfig)
const pool = mysql.createPool(dbConfig)

module.exports = pool;



  