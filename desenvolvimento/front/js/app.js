// Sem login, volta para a tela de entrada
const U = getUser();
if (!U) location.replace("login.html");

let view = "home", rows = [], timer, cnt = {};
const QUICK = [["aluno", "Novo aluno"], ["professor", "Novo professor"], ["sala", "Nova sala"], ["questoes", "Nova questão"]];

const nomeU = U?.nome || "Usuário";
const tipoU = U?.tipo === "professor" ? "Professor" : "Aluno";
const inicial = s => String(s || "?").trim().charAt(0).toUpperCase();
const plural = (n, a, b) => n === 1 ? a : b;

// ---------- navegação ----------
function drawNav() {
  $("nav").innerHTML = ["home", ...Object.keys(E)].map(k =>
    `<button class="ni ${k === view ? "on" : ""}" onclick="go('${k}')">${svg(k)}<span>${k === "home" ? "Início" : E[k].t}</span>${cnt[k] != null ? `<em>${cnt[k]}</em>` : ""}</button>`).join("");
  $("ttl").innerHTML = `<span class="mu">SINA</span><span class="sep">/</span><b>${view === "home" ? "Visão geral" : E[view].t}</b>`;
  $("q").disabled = view === "home";
  $("q").placeholder = view === "home" ? "Buscar..." : "Buscar em " + E[view].t.toLowerCase();
}
function sair() { logout(); location.href = "login.html"; }
function go(v) { view = v; $("q").value = ""; drawNav(); v === "home" ? home() : list(); }

// menu flutuante do botão "Novo"
function pop(ev) {
  ev.stopPropagation();
  const p = $("pop"), r = ev.currentTarget.getBoundingClientRect();
  p.innerHTML = QUICK.map(([k, t]) => `<button onclick="quick('${k}')">${svg(k)}${t}</button>`).join("");
  p.style.left = Math.max(12, r.right - 240) + "px";
  p.style.top = r.bottom + 8 + "px";
  p.hidden = !p.hidden;
}
async function quick(k) { view = k; $("q").value = ""; drawNav(); await list(); abrir(); }

// ---------- peças de tela ----------
function tbl(r, acts) {
  if (!r.length) return '<div class="empty">Nada por aqui ainda.</div>';
  const ks = Object.keys(r[0]).filter(k => k !== "senha" && !k.endsWith("_id"));
  return `<div class="tb"><table><thead><tr>${ks.map(k => `<th>${esc(L[k] || k)}</th>`).join("")}${acts ? "<th></th>" : ""}</tr></thead><tbody>` +
    r.map(o => `<tr>${ks.map(k => `<td title="${esc(o[k])}">${k === "nome" ? `<span class="ini">${esc(inicial(o[k]))}</span>` : ""}${esc(o[k])}</td>`).join("")}${acts ? `<td><button class="btn s sm" onclick="abrir(${o.id})">Editar</button> <button class="btn s sm d" onclick="del(${o.id})">Excluir</button></td>` : ""}</tr>`).join("") + "</tbody></table></div>";
}

// conta quantos registros há por valor de um campo -> [[valor, qtd], ...] do maior para o menor
function contar(arr, k) {
  const m = new Map();
  arr.forEach(o => { const v = o[k] ?? "—"; m.set(v, (m.get(v) || 0) + 1); });
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

// barras de proporção (dados reais; nada inventado)
function bars(itens, total, un) {
  if (itens === null) return '<div class="empty sm">Indisponível agora.</div>';
  if (!itens.length) return '<div class="empty sm">Sem dados ainda.</div>';
  return itens.map(([nome, n]) => {
    const p = total ? Math.round(n / total * 100) : 0;
    return `<div class="br"><div class="brh"><span>${esc(nome)}</span><span class="mu">${n} ${plural(n, un[0], un[1])} · ${p}%</span></div><div class="bar"><i style="width:${p}%"></i></div></div>`;
  }).join("");
}

const card = (ic, t, sub, body) =>
  `<section class="card"><div class="ch"><span class="ibx">${svg(ic)}</span><div><h3>${t}</h3><p>${sub}</p></div></div>${body}</section>`;

// ---------- início ----------
async function home() {
  $("view").innerHTML = '<div class="empty">Carregando…</div>';
  const ks = Object.keys(E), rs = await Promise.allSettled(ks.map(k => api(E[k].p + "/listar")));
  if (view !== "home") return;

  const d = {};
  rs.forEach((r, i) => d[ks[i]] = r.status === "fulfilled" && Array.isArray(r.value) ? r.value : null);
  ks.forEach(k => { if (d[k]) cnt[k] = d[k].length; });
  status(ks.some(k => d[k])); drawNav();

  const alunos = d.aluno || [], salas = d.sala || [], qs = d.questoes || [];
  const porSala = d.aluno && d.sala ? salas.map(s => [s.nome, alunos.filter(a => a.sala === s.nome).length]).sort((a, b) => b[1] - a[1]) : null;
  const porMateria = d.questoes ? contar(qs, "materia") : null;
  const porProf = d.questoes ? contar(qs, "professor") : null;
  const recentes = alunos.slice().sort((a, b) => b.id - a.id).slice(0, 5);
  const primeiro = nomeU.split(" ")[0];

  $("view").innerHTML = `
    <div class="pg"><h1>Olá, ${esc(primeiro)}</h1><p>Visão geral dos cadastros do SINA.</p></div>

    <div class="stats">${ks.map(k => `<button class="st" onclick="go('${k}')">
      <span class="l">${svg(k)}${E[k].t}</span>
      <span class="n">${d[k] ? d[k].length : "—"}</span>
      <span class="c">${d[k] ? plural(d[k].length, "registro", "registros") : "indisponível"}</span></button>`).join("")}</div>

    <div>
      <div class="sec-h"><h2>Distribuição</h2></div>
      <div class="grid3">
        ${card("sala", "Alunos por sala", "Como a turma está dividida", bars(porSala, alunos.length, ["aluno", "alunos"]))}
        ${card("questoes", "Questões por matéria", "Banco de questões cadastrado", bars(porMateria, qs.length, ["questão", "questões"]))}
        ${card("professor", "Questões por professor", "Quem mais cadastrou", bars(porProf, qs.length, ["questão", "questões"]))}
      </div>
    </div>

    <div>
      <div class="sec-h"><h2>Últimos alunos</h2><button class="lk" onclick="go('aluno')">Ver todos</button></div>
      ${recentes.length ? `<div class="rl">${recentes.map(o => `<div class="rr">
        <div class="p"><span class="av">${esc(inicial(o.nome))}</span><div><b>${esc(o.nome)}</b><small>${esc(o.email)}</small></div></div>
        ${o.sala ? `<span class="tag">${esc(o.sala)}</span>` : ""}</div>`).join("")}</div>` : '<div class="empty">Nenhum aluno cadastrado ainda.</div>'}
    </div>`;

  const err = rs.find(r => r.status === "rejected");
  if (err) toast(err.reason.message);
}

// ---------- listas ----------
async function list(q) {
  const key = view, e = E[key];
  $("view").innerHTML = `<div class="hd pg"><div><h1>${e.t}</h1><p id="cnt"></p></div><button class="btn" onclick="abrir()">${svg("plus")}Adicionar ${e.s}</button></div><div id="tb"></div>`;
  let r;
  try {
    r = await api(e.p + (q && e.q ? `/buscar?${e.q}=${encodeURIComponent(q)}` : "/listar"));
    if (!Array.isArray(r)) r = [];
    status(true);
  } catch (x) { r = []; status(false); toast(x.message); }
  if (view !== key) return;
  rows = r; if (!q) cnt[key] = rows.length;
  drawNav(); table(q && !e.q ? q : "");
}
function table(f) {
  const t = f.toLowerCase(), r = rows.filter(o => !t || JSON.stringify(o).toLowerCase().includes(t));
  $("cnt").textContent = r.length + " " + plural(r.length, "registro", "registros");
  $("tb").innerHTML = r.length ? tbl(r, true) : `<div class="empty">Nenhum registro por aqui. Use “Adicionar ${E[view].s}” para criar o primeiro.</div>`;
}

// ---------- cadastro / edição ----------
// (não chame de "form": dentro do onclick de um botão esse nome vira button.form)
function abrir(id) {
  const e = E[view], o = rows.find(r => r.id === id) || {};
  $("frm").innerHTML = `<h2>${id ? "Editar" : "Adicionar"} ${e.s}</h2>` +
    (id ? e.f.filter(f => !f[4]) : e.f).map(([k, l, tp, op]) => `<label class="fld"><span>${l}</span><input name="${k}" type="${tp || "text"}" value="${tp === "password" ? "" : esc(o[k])}" ${!id && !op ? "required" : ""} ${tp === "password" && id ? 'placeholder="Deixe vazio para manter"' : ""}></label>`).join("") +
    `<div class="act"><button type="button" class="btn s" onclick="$('dlg').close()">Cancelar</button><button class="btn">${id ? "Salvar alterações" : "Cadastrar"}</button></div>`;
  $("frm").onsubmit = async ev => {
    ev.preventDefault();
    const b = {};
    new FormData($("frm")).forEach((v, k) => { if (v !== "") b[k] = e.f.find(f => f[0] === k)[2] === "number" ? Number(v) : v; });
    try {
      await api(e.p + (id ? "/atualizar/" + id : "/cadastrar"), {method: id ? "PATCH" : "POST", body: b});
      $("dlg").close(); toast(id ? "Alterações salvas" : "Cadastrado com sucesso"); list();
    } catch (x) { toast(x.message); }
  };
  $("dlg").showModal();
}
async function del(id) {
  if (!confirm("Excluir este registro? Esta ação não pode ser desfeita.")) return;
  try { await api(E[view].p + "/excluir/" + id, {method: "DELETE"}); toast("Excluído"); list(); }
  catch (x) { toast(x.message); }
}

// ---------- início da página ----------
function boot() {
  initTema();

  $("who").innerHTML = `<span class="av">${esc(inicial(nomeU))}</span><div><b>${esc(nomeU)}</b><span class="t">${tipoU}</span></div>`;
  $("ic-busca").innerHTML = svg("busca");
  $("sair").innerHTML = svg("sair") + "<span>Sair</span>";
  $("novo").innerHTML = svg("plus") + "Novo";
  $("date").textContent = new Date().toLocaleDateString("pt-BR", {weekday: "short", day: "2-digit", month: "short", year: "numeric"});

  document.addEventListener("click", () => $("pop").hidden = true);
  $("dlg").addEventListener("click", ev => {   // clicar fora da janela fecha
    const r = ev.currentTarget.getBoundingClientRect();
    if (ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom) ev.currentTarget.close();
  });
  $("q").addEventListener("input", ev => {
    if (view === "home") return;
    clearTimeout(timer);
    const v = ev.target.value.trim();
    timer = setTimeout(() => E[view].q ? list(v) : table(v), 300);
  });

  drawNav(); home();
}
if (U) boot();
