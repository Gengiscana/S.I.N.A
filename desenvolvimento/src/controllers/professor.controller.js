const professorModel = require("../models/professor.model")

const listar = async (req, res) => {
    const resposta = await professorModel.listar()
    res.status(200).json(resposta).end()
}

const cadastrar = async (req, res) => {
    const resposta = await professorModel.cadastrar(req.body)
    res.status(201).json(resposta).end()
}

const atualizar = async (req, res) => {
    const resposta = await professorModel.atualizar(req.body, req.params.id)
    res.status(200).json(resposta).end()
}

const buscar = async (req, res) => {
    const resposta = await professorModel.buscar(req.params.nome)
    res.status(200).json(resposta).end()
}

const excluir = async (req, res) => {
    const resposta = await professorModel.excluir(req.params.id)
    res.status(204).json(resposta).end()
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    buscar,
    excluir
}