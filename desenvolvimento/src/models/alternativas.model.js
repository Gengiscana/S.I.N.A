const con = require("../config/db")

const cadastrar = async ({questao_id, texto_alternativa, is_correta}) =>{
    const [resultado] = await con.query(
        "INSERT INTO alternativas  VALUES (DEFAULT ?, ?, ?, ?);",
        [questao_id, texto_alternativa, is_correta]
    )
    return{
        id: resultado.insertId,
        questao_id,
        texto_alternativa,
        is_correta
    }
}

const listar = async () => {
    const [resultado] = await con.query(
        "SELECT id, questao_id, texto_alternativa, is_correta FROM alternativas"
    )
    return resultado
}

const buscar = async (id) => {
    const [resultado] = await con.query(
        "SELECT id, questao_id, texto_alternativa, is_correta FROM alternativas WHERE id = ?", [id]
    )

    return resultado
}

const atualizar = async (dados, id) => {
    const [resultado] = await con.query(
        "UPDATE alternativas SET ? WHERE id = ?",[dados, id]
    )

    return resultado
}

const excluir = async (id) => {
    const [resultado] = await con.query(
        "DELETE FROM alternativas WHERE id = ?", [id]
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