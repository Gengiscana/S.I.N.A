const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const svg = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${IC[n]}</svg>`;

async function api(path, opt = {}) {
  const c = new AbortController(), t = setTimeout(() => c.abort(), 8000);
  try {
    const r = await fetch(API_URL + path, {...opt, signal: c.signal, headers: {"Content-Type": "application/json"}, body: opt.body && JSON.stringify(opt.body)});
    const d = r.status === 204 ? null : await r.json().catch(() => null);
    if (!r.ok) throw new Error(friendly(d?.erro || d?.sqlMessage || "", r.status));
    return d;
  } catch (e) {
    throw new Error(e.name === "AbortError" ? "O servidor demorou demais para responder. Confira se o back-end está rodando." : e.message === "Failed to fetch" ? "Não consegui falar com o servidor. Confira se o back-end está ligado e se o acesso do front está liberado (CORS)." : e.message);
  } finally { clearTimeout(t); }
}
function friendly(m, s) {
  if (/duplicate/i.test(m)) return "Já existe um cadastro com esse e-mail ou nome.";
  if (/cannot delete/i.test(m)) return "Não dá para excluir: esse item está sendo usado em outros registros.";
  if (/foreign key/i.test(m)) return "Algum número informado (sala, matéria ou professor) não existe ou não combina com os outros.";
  if (/cannot be null|doesn't have a default|incorrect .* value/i.test(m)) return "Faltam dados obrigatórios. Preencha todos os campos.";
  if (m && !/sql|column|table|syntax|ER_/i.test(m)) return m;
  return "O servidor não conseguiu concluir a ação (erro " + s + "). Veja o terminal do back-end.";
}
function toast(m) { const t = $("toast"); t.textContent = m; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 4200); }
function status(ok) { $("dot").className = "dot " + (ok ? "ok" : "off"); $("st").textContent = ok ? "Servidor conectado" : "Servidor fora do ar"; }

// ---- sessão (mesma chave de antes: "sina_user") ----
// "Mantenha-me conectado" marcado -> localStorage; desmarcado -> só até fechar a aba
const CHAVE = "sina_user";
function getUser() {
  try { return JSON.parse(localStorage.getItem(CHAVE) || sessionStorage.getItem(CHAVE) || "null"); }
  catch { return null; }
}
function setUser(u, lembrar) {
  logout();
  (lembrar ? localStorage : sessionStorage).setItem(CHAVE, JSON.stringify(u));
}
function logout() {
  try { localStorage.removeItem(CHAVE); sessionStorage.removeItem(CHAVE); } catch {}
}

// ---- tema claro/escuro (botão sol/lua) ----
function setTema(t) {
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("sina_tema", t); } catch {}
  const b = $("tema");
  if (!b) return;
  const alvo = t === "dark" ? "claro" : "escuro";
  b.innerHTML = svg(t === "dark" ? "sol" : "lua");
  b.setAttribute("aria-label", "Ativar modo " + alvo);
  b.title = "Modo " + alvo;
}
function initTema() {
  const b = $("tema");
  if (!b) return;
  setTema(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  b.onclick = () => setTema(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
}
