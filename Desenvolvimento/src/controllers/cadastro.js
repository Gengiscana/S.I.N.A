const con = require('../db')

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1 
    pedidos.push(dados)
    res.status(201).json(dados)
}
const listar = (req, res) => {
    const { status } = req.query
    let sql = 'SELECT * FROM cadastro'
    const params = []

    if (status) {
        sql += ' WHERE status = ?'
        params.push(status)
    }

    con.query(sql, params, (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Erro ao buscar cadastro' })
        }
        res.json(results)
    })
}
const alterar = (req, res) => {
    const id = req.params.id
    const lista = req.body
    let status = 0

    pedidos.forEach((pedidos) => {
        if(pedidos.id == id) {
            status = 1
            pedidos.cliente_id = lista.cliente_id
            pedidos.data = lista.data
        }
    })
    if (status == 1) {
        res.json(pedidos)
    }else{
        res.status(404).send("Pedido não encontrado")
    }
}
const excluir = (req, res) => {
    const id = req.params.id
    let status = 0
    pedidos.forEach((pedido, indice) => {
        if(pedido.id == id){
            status = 1
            pedidos.splice(indice, 1)
        }
    })
    if(status == 1 ){
        res.json(pedidos)
    }else{
        res.status(404).send("Pedido não encontrado")
    }
}

module.exports = {
    criar, listar, alterar, excluir
}