const con = require("../config/db")
const { erro, filtrar } = require("../utils/util")

const cadastrar = async ({ sala_id, materia_id, professor_id, enunciado, alt1, alt2, alt3, alt4, correta }) => {
    // alternativas A a D; a "correta" é o número da alternativa (1 a 4)
    const alternativas = [alt1, alt2, alt3, alt4]
        .map((texto, i) => ({ texto, correta: Number(correta) === i + 1 }))
        .filter(a => a.texto && String(a.texto).trim())

    if (alternativas.length < 2 || !alternativas.some(a => a.correta)) {
        throw erro("Informe ao menos 2 alternativas e qual delas é a correta.")
    }

    const conn = await con.getConnection()
    try {
        await conn.beginTransaction()
        const [q] = await conn.query(
            "INSERT INTO questao (sala_id, materia_id, professor_id, enunciado) VALUES (?, ?, ?, ?)",
            [sala_id, materia_id, professor_id, enunciado]
        )
        for (const a of alternativas) {
            await conn.query(
                "INSERT INTO alternativa (questao_id, texto_alternativa, is_correta) VALUES (?, ?, ?)",
                [q.insertId, a.texto, a.correta]
            )
        }
        await conn.commit()
        return { id: q.insertId, sala_id, materia_id, professor_id, enunciado }
    } catch (e) {
        await conn.rollback()
        throw e
    } finally {
        conn.release()
    }
}

const listar = async () => {
    const [resultado] = await con.query(
        `SELECT q.id, q.sala_id, q.materia_id, q.professor_id,
                s.nome AS sala, m.nome AS materia, p.nome AS professor, q.enunciado
         FROM questao q
         JOIN sala s ON s.id = q.sala_id
         JOIN materia m ON m.id = q.materia_id
         JOIN professor p ON p.id = q.professor_id
         ORDER BY q.id`
    )
    return resultado
}

const buscar = async (id) => {
    const [[questao]] = await con.query(
        "SELECT id, sala_id, materia_id, professor_id, enunciado FROM questao WHERE id = ?", [id]
    )
    if (!questao) return null
    const [alternativas] = await con.query(
        "SELECT id, texto_alternativa, is_correta FROM alternativa WHERE questao_id = ?", [id]
    )
    return { ...questao, alternativas }
}

const atualizar = async (dados, id) => {
    const campos = filtrar(dados, ["sala_id", "materia_id", "professor_id", "enunciado"])
    const [resultado] = await con.query("UPDATE questao SET ? WHERE id = ?", [campos, id])
    return resultado
}

const excluir = async (id) => {
    const conn = await con.getConnection()
    try {
        await conn.beginTransaction()
        await conn.query("DELETE FROM alternativa WHERE questao_id = ?", [id])
        const [resultado] = await conn.query("DELETE FROM questao WHERE id = ?", [id])
        await conn.commit()
        return resultado
    } catch (e) {
        await conn.rollback()
        throw e
    } finally {
        conn.release()
    }
}

module.exports = { listar, cadastrar, buscar, atualizar, excluir }
