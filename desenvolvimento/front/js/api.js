const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function api(path, opt = {}) {
  const c = new AbortController(), t = setTimeout(() => c.abort(), 8000);
  try {
    const r = await fetch(API_URL + path, { ...opt, signal: c.signal, headers: { "Content-Type": "application/json" }, body: opt.body && JSON.stringify(opt.body) });
    const d = r.status === 204 ? null : await r.json().catch(() => null);
    if (!r.ok) throw new Error(friendly(d?.erro || d?.sqlMessage || "", r.status));
    return d;
  } catch (e) {
    throw new Error(e.name === "AbortError" ? "O servidor demorou demais para responder. Confira se o back-end está rodando." : e.message === "Failed to fetch" ? "Não consegui falar com o servidor. Confira se o back-end está ligado e se o acesso do front está liberado (CORS)." : e.message);
  } finally { clearTimeout(t); }
}
function friendly(m, s) {
  if (/duplicate/i.test(m)) return "Já existe um cadastro com esse e-mail ou nome.";
  if (/foreign key|referenced/i.test(m)) return "Não foi possível concluir: esse item está ligado a outros registros.";
  if (/cannot be null|doesn't have a default|incorrect .* value/i.test(m)) return "Faltam dados obrigatórios. Preencha todos os campos.";
  if (m && !/sql|column|table|syntax|ER_/i.test(m)) return m;
  return "O servidor não conseguiu concluir a ação (erro " + s + "). Veja o terminal do back-end.";
}
function toast(m) { const t = $("toast"); t.textContent = m; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("on"), 4200); }
function status(ok) { $("dot").className = "dot " + (ok ? "ok" : "off"); $("st").textContent = ok ? "Servidor conectado" : "Servidor fora do ar"; }
