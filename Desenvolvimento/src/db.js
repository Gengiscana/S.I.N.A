const mysql = require('mysql')
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database: 'sina'
})

module.exports = connection