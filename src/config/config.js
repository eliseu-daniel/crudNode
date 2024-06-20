const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const con = async () => {
    try {
        const connection = await pool.getConnection()
        console.log('Conectado com Sucesso')
        connection.release()
    } catch (error) {
        console.log('Erro ao conectar', error)
        process.exit(1)
    }
}

module.exports = {pool, con}