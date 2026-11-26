const con = require("../config/db")
const { hash, erro, filtrar } = require("../utils/util")

const BASE = "SELECT a.id, a.nome, a.email, a.sala_id, s.nome AS sala FROM aluno a JOIN sala s ON s.id = a.sala_id"

const cadastrar = async ({ nome, email, senha, sala_id }) => {
    if (!senha) throw erro("Informe a senha.")
    const [resultado] = await con.query(
        "INSERT INTO aluno (sala_id, nome, email, senha) VALUES (?, ?, ?, ?)",
        [sala_id, nome, email, hash(senha)]
    )
    return { id: resultado.insertId, sala_id, nome, email }
}

const listar = async () => {
    const [resultado] = await con.query(`${BASE} ORDER BY a.id`)
    return resultado
}

const buscar = async (nome) => {
    const [resultado] = await con.query(`${BASE} WHERE a.nome LIKE ? ORDER BY a.id`, [`%${nome}%`])
    return resultado
}

const atualizar = async (dados, id) => {
    const campos = filtrar(dados, ["sala_id", "nome", "email", "senha"])
    if (campos.senha) campos.senha = hash(campos.senha)
    const [resultado] = await con.query("UPDATE aluno SET ? WHERE id = ?", [campos, id])
    return resultado
}

const excluir = async (id) => {
    const [resultado] = await con.query("DELETE FROM aluno WHERE id = ?", [id])
    return resultado
}

module.exports = { listar, cadastrar, buscar, atualizar, excluir }
