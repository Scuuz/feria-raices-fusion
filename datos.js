// =====================================================================
//  DATOS DE LA FERIA — Para sumar, quitar o editar un emprendimiento,
//  cambiá solo este archivo. No hace falta tocar nada más.
// =====================================================================

const CONFIG = {
  nombre: "Raíces Fusión",
  instagram: "raicesfusion",
  // WhatsApp de la organización para recibir inscripciones.
  // Formato: código de país + 9 + código de área + número, sin espacios ni "+".
  // Ejemplo: "5491112345678". Si queda vacío, la inscripción se envía por Instagram.
  whatsapp: "5491157599952",
  precio: "$10.000",
  periodo: "por mes",
};

// Cada emprendimiento:
//   nombre, rubro, descripcion (corta), imagen (archivo en /img),
//   instagram (usuario sin @, o ""), whatsapp (mismo formato que arriba, o ""),
//   web (opcional, dirección completa con https://)
const EMPRENDIMIENTOS = [
  {
    nombre: "Bling Bling Shakur",
    rubro: "Belleza",
    descripcion:
      "Joyería dental en zona Oeste. Cristales Swarovski®, Preciosa® y oro 18k, en versión semipermanente y temporal.",
    imagen: "img/bling-bling-shakur.webp",
    instagram: "bling_bling_shakur",
    whatsapp: "",
  },
  {
    nombre: "Aromas con Historia",
    rubro: "Hogar y deco",
    descripcion:
      "Wax melts con identidad e investigación histórica. Envíos a todo el país.",
    imagen: "img/aromas-con-historia.webp",
    instagram: "aromasconnhistoria",
    whatsapp: "",
  },
  {
    nombre: "Ana Millanel",
    rubro: "Belleza",
    descripcion:
      "Cosmética y perfumería por catálogo de Millanel. Parque Patricios, CABA.",
    imagen: "img/ana-millanel.webp",
    instagram: "anamillanel",
    whatsapp: "",
  },
  {
    nombre: "La Suu Tupper",
    rubro: "Hogar y deco",
    descripcion: "Outlet de Tupper en zona CABA, con envíos sin cargo.",
    imagen: "img/la-suu-tupper.webp",
    instagram: "lasuutupper",
    whatsapp: "",
  },
  {
    nombre: "Titania ReMade",
    rubro: "Moda y accesorios",
    descripcion:
      "Carteras únicas hechas con jeans reciclados. Cada diseño nace de material reciclado y mucha creatividad.",
    imagen: "img/titania-remade.webp",
    instagram: "titaniaremade",
    whatsapp: "",
  },
  {
    nombre: "Nativo Copas",
    rubro: "Gastronomía",
    descripcion:
      "Vinos de buen sabor. Envíos en CABA o retiro en persona; pago por transferencia.",
    imagen: "img/nativo-copas.webp",
    instagram: "nativo_copas",
    whatsapp: "",
  },
  {
    nombre: "Taller Mis Ángeles",
    rubro: "Arte y manualidades",
    descripcion:
      "Arte mix media y porcelana fría. Trabajos personalizados, decoración para el hogar y artículos para eventos.",
    imagen: "img/mis-angeles.webp",
    instagram: "misangeles.61",
    whatsapp: "",
  },
  {
    nombre: "ivonr2021 Regalos",
    rubro: "Regalos",
    descripcion:
      "Regalos originales, bazar y decoración: el detalle perfecto para cada ocasión.",
    imagen: "img/ivonr2021.webp",
    instagram: "ivonr2021",
    whatsapp: "",
    web: "https://tiendappp.empretienda.com.ar",
  },
  {
    nombre: "Nandeco",
    rubro: "Arte y manualidades",
    descripcion: "Arte en cerámica: vajilla y piezas decorativas.",
    imagen: "img/nandeco.webp",
    instagram: "",
    whatsapp: "5491165105043",
  },
];
