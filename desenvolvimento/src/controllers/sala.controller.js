const salaModel = require("../models/sala.model")

const listar = async (req, res) => {
    const resposta = await salaModel.listar()
    res.status(200).json(resposta).end()
}

const cadastrar = async (req, res) => {
    const resposta = await salaModel.cadastrar(req.body)
    res.status(201).json(resposta).end()
}

const atualizar = async (req, res) => {
    const resposta = await salaModel.atualizar(req.body, req.params.id)
    res.status(200).json(resposta).end()
}

const buscar = async (req, res) => {
    const resposta = await salaModel.buscar(req.params.id)
    res.status(200).json(resposta).end()
}

const excluir = async (req, res) => {
    const resposta = await salaModel.excluir(req.params.id)
    res.status(204).json(resposta).end()
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    buscar,
    excluir
}