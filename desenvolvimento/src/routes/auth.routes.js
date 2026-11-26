const express = require("express")
const routes = express.Router()

const con = require("../config/db")
const { conferir } = require("../utils/util")

const TABELAS = { aluno: "aluno", professor: "professor" }

routes.post("/login", async (req, res) => {
    const { tipo, email, senha } = req.body || {}

    if (!TABELAS[tipo] || !email || !senha) {
        return res.status(400).json({ erro: "Informe o tipo de acesso, o e-mail e a senha." })
    }

    const [[usuario]] = await con.query(
        `SELECT id, nome, email, senha FROM ${TABELAS[tipo]} WHERE email = ?`, [email]
    )

    if (!usuario || !conferir(senha, usuario.senha)) {
        return res.status(401).json({ erro: "E-mail ou senha incorretos." })
    }

    res.status(200).json({ tipo, id: usuario.id, nome: usuario.nome, email: usuario.email })
})

module.exports = routes
