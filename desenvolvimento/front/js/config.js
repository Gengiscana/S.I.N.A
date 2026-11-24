// Ajuste a URL e os prefixos conforme o app.js do back
const API_URL = "http://localhost:3000";

// p = prefixo da rota, q = campo de busca do back (se houver), f = campos do formulário [chave, rótulo, tipo]
// Nomes que aparecem na tela no lugar dos nomes das colunas do banco
const L = { id: "Nº", nome: "Nome", email: "E-mail", sala_id: "Sala", questao: "Questão", resposta: "Resposta", materia_id: "Matéria", professor_id: "Professor", enunciado: "Enunciado" };

const E = {
  aluno: { t: "Alunos", s: "aluno", p: "/aluno", q: "nome", f: [["nome", "Nome"], ["email", "E-mail", "email"], ["sala_id", "Número da sala", "number"], ["senha", "Senha", "password"]] },
  professor: { t: "Professores", s: "professor", p: "/professor", f: [["nome", "Nome"], ["email", "E-mail", "email"], ["senha", "Senha", "password"]] },
  sala: { t: "Salas", s: "sala", p: "/sala", f: [["nome", "Nome da sala"]] },
  questoes: { t: "Questões", s: "questão", p: "/questoes", f: [["sala_id", "Número da sala", "number"], ["questao", "Questão"], ["resposta", "Resposta"]] }
};

const IC = {
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  aluno: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6M16 4.5a3.5 3.5 0 010 7M18 14c2.5.7 3.5 2.6 3.5 6"/>',
  professor: '<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
  sala: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  questoes: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.7-2.5 2-2.5 4M12 17h.01"/>'
};
