# Brunch Santo Tomé · web

Web de **Brunch Confitería Santo Tomé** (Av. de Irlanda, 3 · 45005 Toledo),
obrador y cafetería 100% sin gluten.

Web estática (HTML + CSS + JS, sin dependencias). Para verla, abre `index.html` en el navegador.
Con internet se cargan las fuentes y el mapa de Google.

## Datos usados (fuentes públicas)
- Dirección, teléfono 925 69 00 04 e Instagram @brunchsantotome.
- Horario: lunes a domingo y festivos, 8:30–21:00 (según la web de contacto del negocio).
- Historia desde 1856, apertura del Brunch en 2019, certificación Espiga Barrada, receta del mazapán (57% almendra Marcona).
- Carta de cafetería (bebidas, combos, bocatines, tostas, flanes, empanadas, helados): carta física del local (fotos de Google Maps).
- Bollería, tartas, pan y mazapán: tienda online del negocio (mazapansingluten.com), IVA incluido.
- Opiniones: extraídos de reseñas públicas (Google 4,6 con más de 400 opiniones, Tripadvisor).

## Logo e iconos
- `assets/logo.svg`: logo oficial (vectorizado de su perfil de Facebook), color de marca `#C91362`.
- `assets/logo-mark.svg`: solo el símbolo en blanco.
- `favicon.ico`, `assets/apple-touch-icon.png`, `assets/icon-192.png`, `assets/icon-512.png`, `site.webmanifest`.
- `assets/og-image.png`: imagen para compartir el enlace.

## Funciones
- Estado *Abierto / Cierra pronto / Cerrado* en tiempo real con la hora de Toledo (`main.js`, constante `HORARIO`).
- Botón flotante de WhatsApp y botones de encargo (`wa.me/34925690004`).

## Mejoras cuando el cliente confirme
- **Confirmar el número de WhatsApp** (ahora se usa el fijo 925 69 00 04; si tienen otro móvil, cambiarlo en `index.html`).
- Añadir **tortitas y postres individuales** de la carta (la foto disponible no se lee bien).
- Fotos reales del local y los productos (galería).
- Dominio propio y despliegue en VPS. Al tener dominio, poner la URL absoluta en `og:image`
  (`https://dominio/assets/og-image.png`) para que la vista previa salga en WhatsApp y redes.
