const con = require("../config/db")

const cadastrar = async ({aluno_id, sala_id, questao_id, alternativa_id, data_envio}) =>{
    const [resultado] = await con.query(
        "INSERT INTO respostas_aluno  VALUES (DEFAULT ?, ?, ?, ?, ?);",
        [aluno_id, sala_id, questao_id, alternativa_id, data_envio]
    )
    return{
        id: resultado.insertId,
        aluno_id,
        sala_id,
        questao_id,
        alternativa_id,
        data_envio
    }
}

const listar = async () => {
    const [resultado] = await con.query(
        "SELECT id, aluno_id, sala_id, questao_id, alternativa_id, data_envio FROM respostas_aluno"
    )

    return resultado
}

const buscar = async (id) => {
    const [resultado] = await con.query(
        "SELECT id, aluno_id, sala_id, questao_id, alternativa_id, data_envio FROM respostas_aluno WHERE id = ?", [id]
    )

    return resultado
}

const atualizar = async (dados, id) => {
    const [resultado] = await con.query(
        "UPDATE respostas_aluno SET ? WHERE id = ?",[dados, id]
    )

    return resultado
}

const excluir = async (id) => {
    const [resultado] = await con.query(
        "DELETE FROM respostas_aluno WHERE id = ?", [id]
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