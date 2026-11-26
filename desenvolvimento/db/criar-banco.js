// Roda o script.sql usando o mysql2 do próprio projeto (não precisa do comando "mysql")
// Coloque este arquivo na mesma pasta do script.sql e rode:  node criar-banco.js
const mysql = require("mysql2/promise")
const fs = require("fs")
const path = require("path")

// mesmos dados do db.js
const CONFIG = { host: "localhost", port: 3306, user: "root", password: "" }

;(async () => {
    const sql = fs.readFileSync(path.join(__dirname, "script.sql"), "utf8")
    const con = await mysql.createConnection({ ...CONFIG, multipleStatements: true })
    await con.query(sql)
    const [alunos] = await con.query("SELECT nome FROM sina.aluno")
    console.log("Banco 'sina' criado com sucesso!")
    console.log("Alunos de exemplo:", alunos.map(a => a.nome).join(", "))
    await con.end()
})().catch(erro => {
    console.error("Não foi possível criar o banco:", erro.message)
    process.exit(1)
})
