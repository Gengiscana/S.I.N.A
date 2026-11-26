const con = require("../config/db")
const { hash, erro, filtrar } = require("../utils/util")

const cadastrar = async ({ nome, email, senha }) => {
    if (!senha) throw erro("Informe a senha.")
    const [resultado] = await con.query(
        "INSERT INTO professor (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, hash(senha)]
    )
    return { id: resultado.insertId, nome, email }
}

const listar = async () => {
    const [resultado] = await con.query("SELECT id, nome, email FROM professor ORDER BY id")
    return resultado
}

const buscar = async (nome) => {
    const [resultado] = await con.query(
        "SELECT id, nome, email FROM professor WHERE nome LIKE ?", [`%${nome ?? ""}%`]
    )
    return resultado
}

const atualizar = async (dados, id) => {
    const campos = filtrar(dados, ["nome", "email", "senha"])
    if (campos.senha) campos.senha = hash(campos.senha)
    const [resultado] = await con.query("UPDATE professor SET ? WHERE id = ?", [campos, id])
    return resultado
}

const excluir = async (id) => {
    const [resultado] = await con.query("DELETE FROM professor WHERE id = ?", [id])
    return resultado
}

module.exports = { listar, cadastrar, buscar, atualizar, excluir }
