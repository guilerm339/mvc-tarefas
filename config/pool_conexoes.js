const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 4,  
    queueLimit: 0
});

pool.getConnection((err, conn) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conectado ao SGBD!");
        conn.release();
    }
});

module.exports = pool.promise();
