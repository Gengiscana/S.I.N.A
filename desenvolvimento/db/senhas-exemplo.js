// Define a senha "123456" para os usuários de exemplo do script.sql (que estão com "HASH_DA_SENHA")
// Não apaga nada. Rode na pasta desenvolvimento/db:  node senhas-exemplo.js
const mysql = require("mysql2/promise")
const { hash } = require("../src/utils/util")

;(async () => {
    const con = await mysql.createConnection({ host: "localhost", port: 3306, user: "root", password: "", database: "sina" })
    for (const tabela of ["aluno", "professor"]) {
        await con.query(`UPDATE ${tabela} SET senha = ? WHERE senha = 'HASH_DA_SENHA'`, [hash("123456")])
    }
    console.log("Pronto! Senha 123456 para: joao@email.com (aluno) e carlos@email.com (professor)")
    await con.end()
})().catch(e => { console.error("Erro:", e.message); process.exit(1) })
