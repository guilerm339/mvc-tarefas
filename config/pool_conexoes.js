const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 4,   // servidor limita a 5; reservamos 1 para a conexão de teste
    queueLimit: 0
});

// testa a conexão ao iniciar — libera o slot após o teste (conn.release())
pool.getConnection((err, conn) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conectado ao SGBD!");
        conn.release(); // IMPORTANTE: devolve a conexão ao pool
    }
});

module.exports = pool.promise();
