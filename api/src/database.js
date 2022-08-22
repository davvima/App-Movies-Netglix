const mysql = require('mysql2');
const { promisify }= require('util');

require('dotenv').config();

const {
  HOST,USER,PASSWORD,DATABASE
} = process.env;
const database = {
  host:HOST,
  user:USER,
  password:PASSWORD,
  database: DATABASE,
}

console.log(database)

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