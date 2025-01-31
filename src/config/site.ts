export const configSite = {
  title: "Generador de articulos",
  navMenuItem: [
    { href: "/", label: "prompt" },
    //{ href: "/registros", label: "registros" },
    //{ href: "/visor", label: "visor de consultas" },
  ],
  defaultPrompt: `Genera un artículo en formato HTML, pero solo incluye las etiquetas que irían dentro del <body>, sin incluir la etiqueta <body> en sí. El contenido debe comenzar directamente con un <h2> y estar enfocado en el tema 'KEYWORD'. El artículo debe estar optimizado para SEO, utilizando palabras clave relevantes de manera natural, y debe ser escrito con un lenguaje sencillo y comprensible, incluso para un niño. Asegúrate de que el texto tenga una estructura clara, con párrafos cortos, listas si es necesario, y un uso adecuado de etiquetas HTML como <h2>, <h3>, <p>, <ul>, <li>, y <strong>.
Además, el artículo debe cumplir con lo siguiente:
Tono conversacional: Usa un lenguaje amigable y cercano, como si estuvieras explicando el tema a un amigo.
Frases cortas: Evita oraciones largas y complejas. Divide las ideas en frases simples.
Analogías y ejemplos: Incluye comparaciones o ejemplos cotidianos para hacer el contenido más relatable.
Estructura clara: Usa subtítulos (<h3>) para dividir el contenido en secciones pequeñas y fáciles de seguir.
Listas numerosas: Incluye listas (<ul> o <ol>) para resumir información y facilitar la lectura.
Optimización para legibilidad: El texto debe obtener un puntaje de 80 o más en analizadores de legibilidad como Flesch-Kincaid, asegurando que no sea demasiado técnico y sea fácil de leer y entender.
El objetivo es que el artículo sea útil, atractivo y accesible para todos los públicos, incluyendo aquellos con poco conocimiento del tema. El artículo debe tener un mínimo de 350 a 400 palabras.
Requisitos obligatorios (deben cumplirse sí o sí):
El título principal del artículo (que iría en un <h1>) debe ser devuelto en la propiedad titlePage.
El contenido del artículo (en formato HTML, sin incluir <body>) debe ser devuelto en la propiedad contentPage.
El título optimizado para SEO debe ser devuelto en la propiedad titleSeo.
La descripción optimizada para SEO debe ser devuelto en la propiedad descriptionSeo.
El extracto del sitio (un resumen breve del artículo) debe ser devuelto en la propiedad excerpt.`,
};
