const respostas_alunoModel = require("../models/respostas_aluno.model")

const listar = async (req, res) => {
    const resposta = await respostas_alunoModel.listar()
    res.status(200).json(resposta).end()
}

const cadastrar = async (req, res) => {
    const resposta = await respostas_alunoModel.cadastrar(req.body)
    res.status(201).json(resposta).end()
}

const atualizar = async (req, res) => {
    const resposta = await respostas_alunoModel.atualizar(req.body, req.params.id)
    res.status(200).json(resposta).end()
}

const buscar = async (req, res) => {
    const resposta = await respostas_alunoModel.buscar(req.params.id)
    res.status(200).json(resposta).end()
}

const excluir = async (req, res) => {
    const resposta = await respostas_alunoModel.excluir(req.params.id)
    res.status(204).json(resposta).end()
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    buscar,
    excluir
}