const con = require("../config/db")

const cadastrar = async ({sala_id, materia_id, professor_id, enunciado}) =>{
    const [resultado] = await con.query(
        "INSERT INTO questoes  VALUES (DEFAULT ?, ?, ?, ?);",
        [sala_id, materia_id, professor_id, enunciado]
    )
    return{
        id: resultado.insertId,
        sala_id,
        materia_id,
        professor_id,
        enunciado
    }
}

const listar = async () => {
    const [resultado] = await con.query(
        "SELECT id, sala_id, materia_id, professor_id, enunciado FROM questoes"
    )

    return resultado
}

const buscar = async (id) => {
    const [resultado] = await con.query(
        "SELECT id, sala_id, materia_id, professor_id, enunciado FROM questoes WHERE id = ?", [id]
    )

    return resultado
}

const atualizar = async (dados, id) => {
    const [resultado] = await con.query(
        "UPDATE questoes SET ? WHERE id = ?",[dados, id]
    )

    return resultado
}

const excluir = async (id) => {
    const [resultado] = await con.query(
        "DELETE FROM questoes WHERE id = ?", [id]
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