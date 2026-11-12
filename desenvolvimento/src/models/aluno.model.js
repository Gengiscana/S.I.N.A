const con = require("../config/db")

const cadastrar = async ({nome, email, senha}) =>{
    const [resultado] = await con.query(
        "INSERT INTO aluno  VALUES (DEFAULT ?, password(?));",
        [nome, email, senha]
    )
    return{
        id: resultado.insertId,
        nome,
        email,
        senha
    }
}

const listar = async () => {
    const [resultado] = await con.query(
        "SELECT id, nome, email FROM aluno"
    )

    return resultado
}

const buscar = async (nome) => {
    const [resultado] = await con.query(
        "SELECT id, nome, email FROM aluno WHERE nome = ?", [nome]
    )

    return resultado
}

const atualizar = async (idados, id) => {
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
    listar, cadastrar, buscar, atualizar, excluir
}