const express = require("express")
const routes = express.Router()

const {cadastrar, listar, buscar, excluir, atualizar} = require("../controllers/aluno.controller")

routes.post("/cadastrar", cadastrar)

routes.get("/listar", listar)

routes.get("/buscar", buscar)

routes.delete("/excluir/:id", excluir)

routes.patch("/atualizar/:id", atualizar)

module.exports = routes