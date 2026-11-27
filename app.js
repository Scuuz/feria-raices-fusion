const ICONOS = {
  whatsapp:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.2-.3Z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2ZM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0Zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9Z"/></svg>',
  web:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-3a15.7 15.7 0 0 0-1.4-3.6A8 8 0 0 1 18.9 8ZM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4ZM4.3 14a8.2 8.2 0 0 1 0-4h3.4a16.5 16.5 0 0 0 0 4H4.3Zm.8 2h3a15.7 15.7 0 0 0 1.4 3.6A8 8 0 0 1 5.1 16Zm3-8h-3a8 8 0 0 1 4.3-3.6C8.9 5.5 8.4 6.7 8.1 8ZM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4Zm2.3-6H9.7a14.7 14.7 0 0 1 0-4h4.6a14.7 14.7 0 0 1 0 4Zm.3 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 0 1-4.4 3.6Zm1.7-5.6a16.5 16.5 0 0 0 0-4h3.4a8.2 8.2 0 0 1 0 4h-3.4Z"/></svg>',
};

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
    rel: "noopener",
    "aria-label": etiqueta,
  });
  a.insertAdjacentHTML("afterbegin", ICONOS[tipo]);
  a.append(crear("span", { text: texto }));
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
  const media = e.imagen
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
  if (e.whatsapp) {
    const url = `https://wa.me/${e.whatsapp}?text=${encodeURIComponent(MENSAJE_CLIENTE)}`;
    acciones.append(botonContacto(url, "whatsapp", "WhatsApp", `Escribir a ${e.nombre} por WhatsApp`));
  }
  if (e.instagram) {
    acciones.append(
      botonContacto(`https://www.instagram.com/${e.instagram}/`, "instagram", "Instagram", `Ver el Instagram de ${e.nombre}`),
    );
  }
  if (e.web) {
    acciones.append(botonContacto(e.web, "web", "Tienda online", `Ver la tienda online de ${e.nombre}`));
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
      estado.textContent = "Revisá los campos marcados: faltan datos obligatorios.";
      invalidos[0].focus();
      return;
    }

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

    if (CONFIG.whatsapp) {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener");
      estado.textContent = "¡Listo! Se abrió WhatsApp con tus datos: solo tocá Enviar.";
      return;
    }

    // Sin WhatsApp configurado: copiamos el mensaje y abrimos el chat de Instagram
    let copiado = false;
    try {
      await navigator.clipboard.writeText(mensaje);
      copiado = true;
    } catch {}
    window.open(`https://ig.me/m/${CONFIG.instagram}`, "_blank", "noopener");
    estado.textContent = copiado
      ? `Copiamos tu mensaje. Pegalo en el chat de Instagram de @${CONFIG.instagram} y envialo.`
      : `Escribinos por Instagram a @${CONFIG.instagram} con estos datos.`;
  });
}

pintarFeria();
prepararFormulario();
