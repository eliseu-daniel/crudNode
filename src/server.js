const porta = 3003
const express = require('express')
const app = express()
const bd = require('./config/database')

app.use(express.json())

app.get('/usuarios', async (req,res,next) => {
    try{
        const users = await bd.all()
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

app.get('/usuarios/:id', async (req,res,next) => {
    try{
        const users = await bd.show(req.params.id)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

app.post('/usuarios', async (req,res, next) => {
    try{
        const {nome, email} = req.body
        const users = await bd.create(nome, email)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

app.put('usuarios/:id',async (req, res, next) => {
    try{
    const {nome, email} = req.body
    const users = await bd.update(req.params.id, nome, email)
    res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

app.delete('usuarios/:id',async (req, res, next) => {
    try{
    const users = await bd.delet(
        req.params.id
    )
    res.json(users)
}catch(error){
    res.status(500).json({error: error.message})
}
})

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})