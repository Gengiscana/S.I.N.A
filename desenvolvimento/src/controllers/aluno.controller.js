const alunoModel = require("../models/aluno.model")

const listar = async (req, res) => {
    const resposta = await alunoModel.listar()
    res.status(200).json(resposta).end()
}

const cadastrar = async (req, res) => {
    const resposta = await alunoModel.cadastrar(req.body)
    res.status(201).json(resposta).end()
}

const atualizar = async (req, res) => {
    const resposta = await alunoModel.atualizar(req.body, req.params.id)
    res.status(200).json(resposta).end()
}

const buscar = async (req, res) => {
    const resposta = await alunoModel.buscar(req.params.nome)
    res.status(200).json(resposta).end()
}

const excluir = async (req, res) => {
    const resposta = await alunoModel.excluir(req.params.id)
    res.status(204).json(resposta).end()
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    buscar,
    excluir
}