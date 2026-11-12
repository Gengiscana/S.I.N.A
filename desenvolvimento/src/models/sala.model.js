const con = require("../config/db")

const cadastrar = async ({aluno_id, professor_id, materia}) =>{
    const [resultado] = await con.query(
        "INSERT INTO sala  VALUES (DEFAULT ?, ?, ?);",
        [aluno_id, professor_id, materia]
    )
    return{
        id: resultado.insertId,
        aluno_id,
        professor_id,
        materia
    }
}

const listar = async () => {
    const [resultado] = await con.query(
        "SELECT id, aluno_id, professor_id, materia FROM sala"
    )

    return resultado
}

const buscar = async (id) => {
    const [resultado] = await con.query(
        "SELECT id, aluno_id, professor_id, materia FROM sala WHERE id = ?", [id]
    )

    return resultado
}

const atualizar = async (dados, id) => {
    const [resultado] = await con.query(
        "UPDATE sala SET ? WHERE id = ?",[dados, id]
    )

    return resultado
}

const excluir = async (id) => {
    const [resultado] = await con.query(
        "DELETE FROM sala WHERE id = ?", [id]
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