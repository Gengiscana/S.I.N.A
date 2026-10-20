const express = require("express")
const router = express.Router()

const Cliente = require("./controllers/clientes")
const Pedido = require("./controllers/pedidos")
const Produto = require("./controllers/produtos")
const Itens = require("./controllers/itens")

const rotaInicial = (req, res) => {
    res.json("Pedidos MVC respondendo")
}

router.get("/", rotaInicial)
router.get("/pedidos", Pedido.listar)
router.get("/itens", Itens.listar)
router.get("/produtos", Produto.listar)
router.get("/clientes", Cliente.listar)
router.post("/pedidos", Pedido.criar)
router.post("/itens", Itens.criar)
router.post("/produtos", Produto.criar)
router.post("/clientes", Cliente.criar)
router.delete("/pedidos/:id", Pedido.excluir)
router.delete("/itens/:id", Itens.excluir)
router.delete("/produtos/:id", Produto.excluir)
router.delete("/clientes/:id", Cliente.excluir)
router.put("/pedidos/:id", Pedido.alterar)
router.put("/itens/:id", Itens.alterar)
router.put("/produtos/:id", Produto.alterar)
router.put("/clientes/:id", Cliente.alterar)

module.exports = router