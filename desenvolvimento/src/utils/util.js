const crypto = require("crypto")

// Senha com hash (scrypt, já vem com o Node: não precisa instalar nada)
const hash = senha => {
    const salt = crypto.randomBytes(16).toString("hex")
    return salt + ":" + crypto.scryptSync(String(senha), salt, 64).toString("hex")
}

// Será usada no login: confere a senha digitada com a guardada no banco
const conferir = (senha, guardado) => {
    const [salt, h] = String(guardado).split(":")
    if (!salt || !h) return false
    const a = Buffer.from(h, "hex"), b = crypto.scryptSync(String(senha), salt, 64)
    return a.length === b.length && crypto.timingSafeEqual(a, b)
}

const erro = (mensagem, status = 400) => Object.assign(new Error(mensagem), { status })

// Só deixa passar os campos permitidos (evita atualizar coluna que não deveria)
const filtrar = (dados = {}, permitidos) => {
    const campos = {}
    for (const k of permitidos) if (dados[k] !== undefined && dados[k] !== "") campos[k] = dados[k]
    if (!Object.keys(campos).length) throw erro("Nenhum campo válido para atualizar.")
    return campos
}

module.exports = { hash, conferir, erro, filtrar }
