const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const alunoRoutes = require("./desenvolvimento/src/routes/aluno.routes")
app.use("/alunos", alunoRoutes)

const professorRoutes = require("./desenvolvimento/src/routes/professor.routes")
app.use("/professores", professorRoutes)

// const historicoRoutes = require("./desenvolvimento/src/routes/historico.routes")
// app.use("/historicos", historicoRoutes)

// Detalhe que é importante descomentar tudo relacionade ao histórico quando o mesmo tiver uma table relacionada no banco de dados

const questoesRoutes = require("./desenvolvimento/src/routes/questoes.routes")
app.use("/questoes", questoesRoutes)

const salaRoutes = require("./desenvolvimento/src/routes/sala.routes")
app.use("/salas", salaRoutes)

const alternativasRoutes = require("./desenvolvimento/src/routes/alternativas.routes")
app.use("/alternativas", alternativasRoutes)

const respostas_alunoRoutes = require("./desenvolvimento/src/routes/respostas_aluno.routes")
app.use("/respostas_aluno", respostas_alunoRoutes)

app.listen(3000, () => {
    console.log(`Server ta rodando top ai no 3000`)
})