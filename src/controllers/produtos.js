const produtos = require("../../dados/produtos.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(produtos[produtos.length - 1].id) + 1
    produtos.push(dados)
    res.status(201).json(dados)
}
const listar = (req, res) => {
    res.json(produtos)
}
const alterar = (req, res) => {
    const id = req.params.id
    const lista = req.body
    let status = 0

    produtos.forEach((produtos) => {
        if(produtos.id == id) {
            status = 1
            produtos.cliente_id = lista.cliente_id
            produtos.nome = lista.nome
            produtos.preco = lista.preco
        }
    })
    if (status == 1) {
        res.json(produtos)
    }else{
        res.status(404).send("produto não encontrado")
    }
}
const excluir = (req, res) => {
    const id = req.params.id
    let status = 0
    produtos.forEach((produto, indice) => {
        if(produto.id == id){
            status = 1
            produtos.splice(indice, 1)
        }
    })
    if(status == 1 ){
        res.json(produtos)
    }else{
        res.status(404).send("produto não encontrado")
    }
}

module.exports = {
    criar, listar, alterar, excluir
}