const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3000, () => {
    console.log(`Server ta rodando top ai no 3000`)
})