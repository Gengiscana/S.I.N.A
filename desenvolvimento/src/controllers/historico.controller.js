// const historicoModel = require("../models/historico.model")

// const listar = async (req, res) => {
//     const resposta = await historicoModel.listar()
//     res.status(200).json(resposta).end()
// }

// const cadastrar = async (req, res) => {
//     const resposta = await historicoModel.cadastrar(req.body)
//     res.status(201).json(resposta).end()
// }

// const atualizar = async (req, res) => {
//     const resposta = await historicoModel.atualizar(req.body, req.params.id)
//     res.status(200).json(resposta).end()
// }

// const buscar = async (req, res) => {
//     const resposta = await historicoModel.buscar(req.params.id)
//     res.status(200).json(resposta).end()
// }

// const excluir = async (req, res) => {
//     const resposta = await historicoModel.excluir(req.params.id)
//     res.status(204).json(resposta).end()
// }

// module.exports = {
//     listar,
//     cadastrar,
//     atualizar,
//     buscar,
//     excluir
// }