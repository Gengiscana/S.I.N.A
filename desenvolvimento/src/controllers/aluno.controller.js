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
    const { nome } = req.query

    if (!nome || !nome.trim()) {
        return res.status(400).json({ erro: "Informe o nome na query" })
    }

    const resposta = await alunoModel.buscar(nome.trim())
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