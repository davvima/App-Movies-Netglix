const mysql = require('mysql2');
const { promisify }= require('util');

const { database } = require('./keys')

const pool = mysql.createPool(database)

pool.getConnection((err, connection)=>{
    if(err){
        console.error(err.code)
        }
    if(connection) connection.release();
    console.log('DB is connected')
    return
})

//Convirtiendo en promesas el uso de callbacks
pool.query = promisify(pool.query);

module.exports = pool