const questoesModel = require("../models/questoes.model")

const listar = async (req, res) => {
    const resposta = await questoesModel.listar()
    res.status(200).json(resposta).end()
}

const cadastrar = async (req, res) => {
    const resposta = await questoesModel.cadastrar(req.body)
    res.status(201).json(resposta).end()
}

const atualizar = async (req, res) => {
    const resposta = await questoesModel.atualizar(req.body, req.params.id)
    res.status(200).json(resposta).end()
}

const buscar = async (req, res) => {
    const resposta = await questoesModel.buscar(req.params.id)
    res.status(200).json(resposta).end()
}

const excluir = async (req, res) => {
    const resposta = await questoesModel.excluir(req.params.id)
    res.status(204).json(resposta).end()
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    buscar,
    excluir
}