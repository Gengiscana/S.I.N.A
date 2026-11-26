const con = require("../config/db")
const { filtrar } = require("../utils/util")

const cadastrar = async ({ nome }) => {
    const [resultado] = await con.query("INSERT INTO sala (nome) VALUES (?)", [nome])
    return { id: resultado.insertId, nome }
}

const listar = async () => {
    const [resultado] = await con.query("SELECT id, nome FROM sala ORDER BY id")
    return resultado
}

const buscar = async (id) => {
    const [resultado] = await con.query("SELECT id, nome FROM sala WHERE id = ?", [id])
    return resultado
}

const atualizar = async (dados, id) => {
    const [resultado] = await con.query("UPDATE sala SET ? WHERE id = ?", [filtrar(dados, ["nome"]), id])
    return resultado
}

const excluir = async (id) => {
    const [resultado] = await con.query("DELETE FROM sala WHERE id = ?", [id])
    return resultado
}

module.exports = { listar, cadastrar, buscar, atualizar, excluir }
