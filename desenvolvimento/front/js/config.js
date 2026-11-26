// Ajuste a URL e os prefixos conforme o app.js do back
const API_URL = "http://localhost:3000";

// p = prefixo da rota, q = campo de busca do back (se houver), f = campos do formulário [chave, rótulo, tipo]
// Nomes que aparecem na tela no lugar dos nomes das colunas do banco
const L = {id:"Nº", nome:"Nome", email:"E-mail", sala_id:"Sala", questao:"Questão", resposta:"Resposta", materia_id:"Matéria", professor_id:"Professor", sala:"Sala", materia:"Matéria", professor:"Professor", enunciado:"Enunciado"};

const E = {
  aluno:     {t:"Alunos",      s:"aluno",     p:"/alunos",     q:"nome", f:[["nome","Nome"],["email","E-mail","email"],["sala_id","Número da sala","number"],["senha","Senha","password"]]},
  professor: {t:"Professores", s:"professor", p:"/professores", f:[["nome","Nome"],["email","E-mail","email"],["senha","Senha","password"]]},
  sala:      {t:"Salas",       s:"sala",      p:"/salas",      f:[["nome","Nome da sala"]]},
  // campo = [chave, rótulo, tipo, opcional?, só ao criar?]
  questoes:  {t:"Questões",    s:"questão",   p:"/questoes",  f:[["sala_id","Número da sala","number"],["materia_id","Número da matéria (1 Matemática, 2 História, 3 Física, 4 Português)","number"],["professor_id","Número do professor","number"],["enunciado","Enunciado"],["alt1","Alternativa A","text",0,1],["alt2","Alternativa B","text",0,1],["alt3","Alternativa C (opcional)","text",1,1],["alt4","Alternativa D (opcional)","text",1,1],["correta","Qual é a correta? (1 a 4)","number",0,1]]}
};

// Ícones (traços SVG 24x24)
const IC = {
  sair:'<path d="M9 21H5V3h4M16 17l5-5-5-5M21 12H9"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  home:'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  aluno:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6M16 4.5a3.5 3.5 0 010 7M18 14c2.5.7 3.5 2.6 3.5 6"/>',
  professor:'<rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/>',
  sala:'<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  questoes:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.7-2.5 2-2.5 4M12 17h.01"/>',
  grafico:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  busca:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  sol:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  lua:'<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
  olho:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  olhoOff:'<path d="M3 3l18 18M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1M9.9 9.9a3 3 0 004.2 4.2"/>'
};
