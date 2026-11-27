// Validaciones: si un dato de datos.js tiene un formato inesperado, no se muestra
const ES_WHATSAPP = /^\d{10,15}$/;
const ES_INSTAGRAM = /^[A-Za-z0-9._]{1,30}$/;
function urlSegura(texto) {
  try {
    const url = new URL(texto);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function icono(nombre) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS(ns, "use");
  use.setAttribute("href", `#i-${nombre}`);
  svg.append(use);
  return svg;
}

const RUBROS_FORMULARIO = [
  "Belleza",
  "Moda y accesorios",
  "Hogar y deco",
  "Arte y manualidades",
  "Regalos",
  "Gastronomía",
  "Bienestar",
  "Niños",
  "Mascotas",
  "Servicios",
  "Otro",
];

const MENSAJE_CLIENTE = `¡Hola! Te encontré en la feria online de ${CONFIG.nombre} 🌿`;

function crear(tag, props = {}, ...hijos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else el.setAttribute(k, v);
  }
  el.append(...hijos.filter(Boolean));
  return el;
}

function botonContacto(href, tipo, texto, etiqueta) {
  const a = crear("a", {
    class: `contact${tipo === "whatsapp" ? " contact--wa" : ""}`,
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": etiqueta,
  });
  a.append(icono(tipo), crear("span", { text: texto }));
  return a;
}

function iniciales(nombre) {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function tarjeta(e) {
  const media = /^img\/[a-z0-9-]+\.(webp|png|jpe?g)$/.test(e.imagen ?? "")
    ? crear("img", {
        src: e.imagen,
        alt: `Logo de ${e.nombre}`,
        width: "112",
        height: "112",
        loading: "lazy",
        decoding: "async",
      })
    : crear("div", { class: "avatar", "aria-hidden": "true", text: iniciales(e.nombre) });

  const acciones = crear("footer");
  if (ES_WHATSAPP.test(e.whatsapp ?? "")) {
    const url = `https://wa.me/${e.whatsapp}?text=${encodeURIComponent(MENSAJE_CLIENTE)}`;
    acciones.append(botonContacto(url, "whatsapp", "WhatsApp", `Escribir a ${e.nombre} por WhatsApp`));
  }
  if (ES_INSTAGRAM.test(e.instagram ?? "")) {
    acciones.append(
      botonContacto(`https://www.instagram.com/${e.instagram}/`, "instagram", "Instagram", `Ver el Instagram de ${e.nombre}`),
    );
  }
  const web = e.web ? urlSegura(e.web) : null;
  if (web) {
    acciones.append(botonContacto(web, "web", "Tienda online", `Ver la tienda online de ${e.nombre}`));
  }

  const card = crear(
    "article",
    { class: "card" },
    media,
    crear("h3", { text: e.nombre }),
    crear("p", { class: "tag", text: e.rubro }),
    crear("p", { text: e.descripcion }),
    acciones,
  );
  return crear("li", { "data-rubro": e.rubro }, card);
}

function pintarFeria() {
  const lista = document.getElementById("stands");
  const filtros = document.getElementById("filtros");
  const estado = document.getElementById("estado-filtro");

  const items = EMPRENDIMIENTOS.map(tarjeta);
  lista.append(...items);

  // Rubros en orden de aparición, con "Otros" al final
  const conteo = new Map();
  for (const e of EMPRENDIMIENTOS) conteo.set(e.rubro, (conteo.get(e.rubro) ?? 0) + 1);
  const rubros = [...conteo.keys()].sort((a, b) => (a === "Otros") - (b === "Otros") || a.localeCompare(b, "es"));

  const chip = (valor, texto, cantidad) => {
    const b = crear("button", { type: "button", class: "chip", "aria-pressed": "false", "data-valor": valor });
    b.append(texto, crear("span", { class: "count", text: `(${cantidad})` }));
    return b;
  };
  const chips = [chip("", "Todos", EMPRENDIMIENTOS.length), ...rubros.map((r) => chip(r, r, conteo.get(r)))];
  chips[0].setAttribute("aria-pressed", "true");
  filtros.append(...chips);

  filtros.addEventListener("click", (ev) => {
    const boton = ev.target.closest(".chip");
    if (!boton) return;
    const valor = boton.dataset.valor;
    for (const c of chips) c.setAttribute("aria-pressed", String(c === boton));

    let visibles = 0;
    for (const li of items) {
      const mostrar = !valor || li.dataset.rubro === valor;
      li.hidden = !mostrar;
      if (mostrar) visibles++;
    }
    const plural = visibles === 1 ? "emprendimiento" : "emprendimientos";
    estado.textContent = valor ? `${visibles} ${plural} en ${valor}` : `Todos los emprendimientos: ${visibles}`;
  });

  // Datos de la portada
  for (const el of document.querySelectorAll('[data-stat="emprendimientos"]')) el.textContent = EMPRENDIMIENTOS.length;
  for (const el of document.querySelectorAll('[data-stat="rubros"]')) el.textContent = rubros.length;
  for (const el of document.querySelectorAll('[data-stat="precio"]')) el.textContent = CONFIG.precio;
  for (const el of document.querySelectorAll('[data-stat="periodo"]')) el.textContent = CONFIG.periodo;
}

function prepararFormulario() {
  const form = document.getElementById("form-inscripcion");
  const select = document.getElementById("f-rubro");
  const estado = document.getElementById("form-estado");
  select.append(...RUBROS_FORMULARIO.map((r) => crear("option", { value: r, text: r })));

  const campos = [...form.elements].filter((el) => el.matches("input, select, textarea"));

  const validar = (el) => {
    const ok = el.checkValidity();
    if (ok) el.removeAttribute("aria-invalid");
    else el.setAttribute("aria-invalid", "true");
    return ok;
  };
  for (const el of campos) {
    // Limpia el error mientras escribe; valida al salir del campo si fue editado
    el.addEventListener("input", () => el.getAttribute("aria-invalid") && validar(el));
    el.addEventListener("blur", () => el.value && validar(el));
  }

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const invalidos = campos.filter((el) => !validar(el));
    if (invalidos.length) {
      estado.textContent = "Revisá los campos marcados: falta completar o corregir un dato.";
      invalidos[0].focus();
      return;
    }

    const boton = form.querySelector('button[type="submit"]');
    boton.disabled = true;
    setTimeout(() => (boton.disabled = false), 3000);

    const d = Object.fromEntries(new FormData(form));
    const ig = d.instagram.trim().replace(/^@/, "");
    const mensaje = [
      `¡Hola ${CONFIG.nombre}! Quiero inscribir mi emprendimiento en la feria online 🌿`,
      "",
      `• Nombre: ${d.nombre.trim()}`,
      `• Emprendimiento: ${d.emprendimiento.trim()}`,
      `• Rubro: ${d.rubro}`,
      `• WhatsApp: ${d.whatsapp.trim()}`,
      ig ? `• Instagram: @${ig}` : null,
      `• Qué vendo: ${d.descripcion.trim()}`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    if (ES_WHATSAPP.test(CONFIG.whatsapp)) {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
      estado.textContent = "¡Listo! Se abrió WhatsApp con tus datos: solo tocá Enviar.";
      return;
    }

    // Sin WhatsApp configurado: copiamos el mensaje y abrimos el chat de Instagram
    let copiado = false;
    try {
      await navigator.clipboard.writeText(mensaje);
      copiado = true;
    } catch {}
    window.open(`https://ig.me/m/${CONFIG.instagram}`, "_blank", "noopener,noreferrer");
    estado.textContent = copiado
      ? `Copiamos tu mensaje. Pegalo en el chat de Instagram de @${CONFIG.instagram} y envialo.`
      : `Escribinos por Instagram a @${CONFIG.instagram} con estos datos.`;
  });
}

pintarFeria();
prepararFormulario();
