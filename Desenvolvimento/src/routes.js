const express = require("express")
const router = express.Router()

const Sala = require("./controllers/sala")
const Cadastro = require("./controllers/cadastro")
const Historico = require("./controllers/historico")
const Questoes = require("./controllers/questoes")

const rotaInicial = (req, res) => {
    res.json("cadastro MVC respondendo")
}

router.get("/", rotaInicial)
router.get("/cadastro", Cadastro.listar)
router.get("/questoes", Questoes.listar)
router.get("/historico", Historico.listar)
router.get("/sala", Sala.listar)
router.post("/cadastro", Cadastro.criar)
router.post("/questoes", Questoes.criar)
router.post("/historico", Historico.criar)
router.post("/sala", Sala.criar)
router.delete("/cadastro/:id", Cadastro.excluir)
router.delete("/questoes/:id", Questoes.excluir)
router.delete("/historico/:id", Historico.excluir)
router.delete("/sala/:id", Sala.excluir)
router.put("/cadastro/:id", Cadastro.alterar)
router.put("/questoes/:id", Questoes.alterar)
router.put("/historico/:id", Historico.alterar)
router.put("/sala/:id", Sala.alterar)

module.exports = router