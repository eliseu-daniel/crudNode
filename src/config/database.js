const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
const {pool} = require('./config')

dotenv.config()


function all(){
    const sql = pool.query('SELECT * FROM users')

    return {sql}
}

function create(nome, email){
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)'
    const params = pool.execute(sql, [nome, email])
    return {id: params.insertId, nome, email}
}

function show(id){
    const sql = 'SELECT * FROM users WHERE id= ?'
    const params = [id]
    return {sql, params}
}

function update(id, nome, email){
    const sql = "UPDATE users SET name= ?, email= ? WHERE id= ?"
    const params = [nome, email, id]
    return {sql, params}
}

function delet(id){
    const sql = 'DELETE FROM users WHERE id= ?'
    const params = [id]
    return {sql, params}
}

module.exports = {all, show, create, update, delet}