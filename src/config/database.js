const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
const {pool} = require('./config')

dotenv.config()

async function all(){
    const [sql] = await pool.execute('SELECT * FROM users')
    return sql
}

async function create(nome, email){
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)'
    const [params] = await pool.execute(sql, [nome, email])
    return {id: params.insertId, nome, email}
}

async function show(id){
    const [sql] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    return sql[0]
}

async function update(id, nome, email){
    const sql = 'UPDATE users SET name= ?, email= ? WHERE id = ?'
    await pool.execute(sql, [nome, email, id])
    return {id, nome, email}
}

async function delet(id){
    const [sql] = await pool.execute('DELETE FROM users WHERE id = ?', [id])
    return sql [0]
}

module.exports = {all, show, create, update, delet}