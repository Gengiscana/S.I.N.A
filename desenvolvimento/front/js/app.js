let view = "home", rows = [], timer;

function drawNav() {
  $("nav").innerHTML = '<div class="brand"><img class="logo" src="favicon.svg" alt=""><span>SINA</span></div>' + ["home", ...Object.keys(E)].map(k =>
    `<button class="ni ${k === view ? "on" : ""}" onclick="go('${k}')"><svg viewBox="0 0 24 24">${IC[k]}</svg>${k === "home" ? "Início" : E[k].t}</button>`).join("");
}
function go(v) { view = v; $("q").value = ""; drawNav(); v === "home" ? home() : list(); }

function tbl(r, acts) {
  if (!r.length) return '<div class="empty">Nada por aqui ainda.</div>';
  const ks = Object.keys(r[0]).filter(k => k !== "senha");
  return `<div class="wrap"><table><thead><tr>${ks.map(k => `<th>${esc(L[k] || k)}</th>`).join("")}${acts ? "<th></th>" : ""}</tr></thead><tbody>` +
    r.map(o => `<tr>${ks.map(k => `<td>${esc(o[k])}</td>`).join("")}${acts ? `<td><button class="btn s sm" onclick="form(${o.id})">Editar</button> <button class="btn s sm d" onclick="del(${o.id})">Excluir</button></td>` : ""}</tr>`).join("") + "</tbody></table></div>";
}

async function home() {
  $("view").innerHTML = '<div class="cd empty">Carregando…</div>';
  const ks = Object.keys(E), rs = await Promise.allSettled(ks.map(k => api(E[k].p + "/listar")));
  const d = rs.map(r => r.status === "fulfilled" && Array.isArray(r.value) ? r.value : null);
  const n = d.map(x => x && x.length), max = Math.max(1, ...n.map(x => x || 0));
  status(d.some(Boolean));
  const salas = d[ks.indexOf("sala")] || [], alunos = (d[0] || []).slice().sort((a, b) => b.id - a.id).slice(0, 5);
  $("view").innerHTML =
    `<div><h1>Visão geral</h1><p class="sub">Resumo do que está cadastrado no SINA.</p></div>
    <div class="g4">${ks.map((k, i) => `<div class="cd st" onclick="go('${k}')"><div class="hd"><span class="mu">${E[k].t}</span><span class="bg">Ver lista</span></div><b>${n[i] ?? "—"}</b><span class="mu">Cadastrados no SINA</span></div>`).join("")}</div>
    <div class="g2">
      <div class="cd"><h2>Cadastros por tipo</h2><div class="bars">${ks.map((k, i) => `<div class="col"><span>${n[i] ?? "—"}</span><i class="${n[i] && n[i] === max ? "hi" : ""}" style="height:${n[i] ? Math.max(10, n[i] / max * 140) : 4}px"></i><em>${E[k].t}</em></div>`).join("")}</div></div>
      <div class="cd"><div class="hd"><h2>Salas</h2><button class="lk" onclick="go('sala')">Ver todas</button></div>${salas.length ? `<div class="sl">${salas.map(s => `<div><b>${esc(s.nome ?? "Sala")}</b><span class="mu">Sala nº ${esc(s.id)}</span></div>`).join("")}</div>` : '<div class="empty">Nenhuma sala disponível.</div>'}</div>
    </div>
    <div class="cd"><div class="hd"><h2>Últimos alunos</h2><button class="lk" onclick="go('aluno')">Ver todos</button></div>${tbl(alunos)}</div>`;
  const err = rs.find(r => r.status === "rejected");
  if (err) toast(err.reason.message);
}

async function list(q) {
  const e = E[view];
  $("view").innerHTML = `<div class="cd"><div class="hd"><div><h1>${e.t}</h1><p class="sub" id="cnt"></p></div><button class="btn" onclick="form()">Adicionar ${e.s}</button></div><div id="tb"></div></div>`;
  try {
    rows = await api(e.p + (q && e.q ? `/buscar?${e.q}=${encodeURIComponent(q)}` : "/listar"));
    if (!Array.isArray(rows)) rows = [];
    status(true);
  } catch (x) { rows = []; status(false); toast(x.message); }
  table(q && !e.q ? q : "");
}
function table(f) {
  const t = f.toLowerCase(), r = rows.filter(o => !t || JSON.stringify(o).toLowerCase().includes(t));
  $("cnt").textContent = r.length + (r.length === 1 ? " registro" : " registros");
  $("tb").innerHTML = r.length ? tbl(r, true) : `<div class="empty">Nenhum registro por aqui. Use “Adicionar ${E[view].s}” para criar o primeiro.</div>`;
}

function form(id) {
  const e = E[view], o = rows.find(r => r.id === id) || {};
  $("frm").innerHTML = `<h2>${id ? "Editar" : "Adicionar"} ${e.s}</h2>` +
    e.f.map(([k, l, tp]) => `<label>${l}<input name="${k}" type="${tp || "text"}" value="${tp === "password" ? "" : esc(o[k])}" ${!id && tp !== "number" ? "required" : ""} ${tp === "password" && id ? 'placeholder="Deixe vazio para manter"' : ""}></label>`).join("") +
    `<div class="act"><button type="button" class="btn s" onclick="$('dlg').close()">Cancelar</button><button class="btn">Salvar alterações</button></div>`;
  $("frm").onsubmit = async ev => {
    ev.preventDefault();
    const b = {};
    new FormData($("frm")).forEach((v, k) => { if (v !== "") b[k] = e.f.find(f => f[0] === k)[2] === "number" ? Number(v) : v; });
    try {
      await api(e.p + (id ? "/atualizar/" + id : "/cadastrar"), { method: id ? "PATCH" : "POST", body: b });
      $("dlg").close(); toast(id ? "Alterações salvas" : "Cadastrado com sucesso"); list();
    } catch (x) { toast(x.message); }
  };
  $("dlg").showModal();
}
async function del(id) {
  if (!confirm("Excluir este registro? Esta ação não pode ser desfeita.")) return;
  try { await api(E[view].p + "/excluir/" + id, { method: "DELETE" }); toast("Excluído"); list(); }
  catch (x) { toast(x.message); }
}

$("q").addEventListener("input", ev => {
  if (view === "home") return;
  clearTimeout(timer);
  const v = ev.target.value.trim();
  timer = setTimeout(() => E[view].q ? list(v) : table(v), 300);
});
$("date").textContent = new Date().toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
drawNav(); home();
