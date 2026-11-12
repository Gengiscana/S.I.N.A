// const con = require("../config/db")

// const cadastrar = async ({nome, email, senha}) =>{
//     const [resultado] = await con.query(
//         "INSERT INTO historico  VALUES (DEFAULT ?, password(?));",
//         [nome, email, senha]
//     )
//     return{
//         id: resultado.insertId,
//         nome,
//         email
//     }
// }

// const listar = async () => {
//     const [resultado] = await con.query(
//         "SELECT id, nome, email FROM historico"
//     )

//     return resultado
// }

// const buscar = async (nome) => {
//     const [resultado] = await con.query(
//         "SELECT id, nome, email FROM historico WHERE nome = ?", [nome]
//     )

//     return resultado
// }

// const atualizar = async (dados, id) => {
//     const [resultado] = await con.query(
//         "UPDATE historico SET ? WHERE id = ?",[dados, id]
//     )

//     return resultado
// }

// const excluir = async (id) => {
//     const [resultado] = await con.query(
//         "DELETE FROM historico WHERE id = ?", [id]
//     )

//     return resultado
// }

// module.exports = {
//     listar,
//     cadastrar,
//     buscar,
//     atualizar,
//     excluir
// }