const porta = 3003
const express = require('express')
const app = express()
const bd = require('./config/database')

app.use(express.json())

app.get('/usuarios', async (req,res,next) => {
    const users = await bd.all()
    res.json(users)
})

app.get('/usuarios/:id', (req,res,next) => {
    res.send(bd.show(req.params.id))
})

app.post('/usuarios', (req,res, next) => {
    const users = bd.create({
        nome: req.body.nome,
        email: req.body.email
    })
    res.send(users)
})

app.put('usuarios/:id', (req, res, next) => {
    const users = bd.update({
        id:    req.params.id,
        nome:  req.params.nome,
        email: req.params.email
    })
    res.send(users)
})

app.delete('usuarios/:id', (req, res, next) => {
    const users = bd.delet({
        id: req.params.id
    })
    res.send(users)
})

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})