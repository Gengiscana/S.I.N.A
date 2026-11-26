// Quem já está logado vai direto para o painel
if (getUser()) location.replace("index.html");

initTema();

let tipo = "aluno";
document.querySelectorAll("input[name=tipo]").forEach(r => r.onchange = () => {
  tipo = r.value;
  $("sub").textContent = "Acesse com a sua conta de " + tipo + ".";
  $("err").textContent = "";
});

$("ver").innerHTML = svg("olho");
$("ver").onclick = () => {
  const s = $("senha"), oculta = s.type === "password";
  s.type = oculta ? "text" : "password";
  $("ver").innerHTML = svg(oculta ? "olhoOff" : "olho");
  $("ver").setAttribute("aria-label", oculta ? "Ocultar senha" : "Mostrar senha");
};

$("f").onsubmit = async ev => {
  ev.preventDefault();
  $("err").textContent = "";
  $("go").disabled = true;
  try {
    const u = await api("/auth/login", {method: "POST", body: {tipo, email: $("email").value.trim(), senha: $("senha").value}});
    setUser(u, $("lembrar").checked);
    location.href = "index.html";
  } catch (x) { $("err").textContent = x.message; }
  finally { $("go").disabled = false; }
};
