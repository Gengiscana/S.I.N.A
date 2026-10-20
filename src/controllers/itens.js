const itens = require("../../dados/itens.json")

const calTotal = () => {
    itens.forEach(i => {
        i.total = i.quantidade * i.preco
    })
}

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(itens[itens.length - 1].id) + 1
    itens.push(dados)
    res.status(201).json(dados)
}
const listar = (req, res) => {
    calTotal()
    res.json(itens)
}
const alterar = (req, res) => {
    const id = req.params.id
    const lista = req.body
    let status = 0

    itens.forEach((itens) => {
        if(itens.id == id) {
            status = 1
            itens.pedido_id = lista.cliente_id
            itens.produto_id = lista.produto_id
            itens.preco = lista.preco
            itens.quantidade = lista.quantidade
        }
    })
    if (status == 1) {
        res.json(itens)
    }else{
        res.status(404).send("iten não encontrado")
    }
}
const excluir = (req, res) => {
    const id = req.params.id
    let status = 0
    itens.forEach((iten, indice) => {
        if(iten.id == id){
            status = 1
            itens.splice(indice, 1)
        }
    })
    if(status == 1 ){
        res.json(itens)
    }else{
        res.status(404).send("iten não encontrado")
    }
}

module.exports = {
    criar, listar, alterar, excluir
}