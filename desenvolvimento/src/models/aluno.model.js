const con = require("../config/db")

const cadastrar = async ({sala_id, nome, email, senha}) =>{
    const [resultado] = await con.query(
        "INSERT INTO aluno (sala_id, nome, email, senha) VALUES (?, ?, ?, ?)",
        [sala_id, nome, email, senha]
    )
    return{
        id: resultado.insertId,
        sala_id,
        nome,
        email
    }
}

const listar = async () => {
    const [resultado] = await con.query(
        "SELECT id, sala_id, nome, email FROM aluno"
    )

    return resultado
}

const buscar = async (nome) => {
    const [resultado] = await con.query(
        "SELECT id, sala_id, nome, email FROM aluno WHERE nome LIKE ?", [`%${nome}%`]
    )

    return resultado
}

const atualizar = async (dados, id) => {
    const [resultado] = await con.query(
        "UPDATE aluno SET ? WHERE id = ?",[dados, id]
    )

    return resultado
}

const excluir = async (id) => {
    const [resultado] = await con.query(
        "DELETE FROM aluno WHERE id = ?", [id]
    )

    return resultado
}

module.exports = {
    listar,
    cadastrar,
    buscar,
    atualizar,
    excluir
}