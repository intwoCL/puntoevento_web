# PuntoEvento — Gamificación Corporativa B2B

Plataforma de gamificación corporativa con dos módulos: **Puntos** (economía de recompensas) y **Eventos** (gestión de eventos con tickets digitales).

## Estructura del Proyecto

```
_web/
├── index.html                  ← Hub principal (overview + links a subproductos)
├── puntos.html                 ← Landing dedicada: Puntos Express + features
├── eventos.html                ← Landing dedicada: Eventos Express + features
├── corporativo.html            ← Landing dedicada: Corporate Pro + Enterprise
├── app.js                      ← Lógica compartida (simulador, modals, Discord)
├── styles.css                  ← Design tokens globales + componentes compartidos
├── sitemap.xml                 ← SEO: sitemap para Google
├── robots.txt                  ← SEO: instrucciones para crawlers
├── pages/
│   ├── puntos.css              ← Estilos exclusivos de la landing de Puntos
│   ├── eventos.css             ← Estilos exclusivos de la landing de Eventos
│   └── corporativo.css         ← Estilos exclusivos de la landing Corporativo
├── assets/
│   └── img/                    ← Screenshots, mockups, logos
└── README.md                   ← Este archivo
```

## URLs de Producción (puntoevento.cl)

| Página | URL | Title |
|--------|-----|-------|
| Hub | `https://puntoevento.cl/` | PuntoEvento — Gamificación Corporativa B2B |
| Puntos | `https://puntoevento.cl/puntos.html` | Puntos Corporativos y Fidelización — PuntoEvento |
| Eventos | `https://puntoevento.cl/eventos.html` | Gestión de Eventos con Tickets Digitales — PuntoEvento |
| Corporativo | `https://puntoevento.cl/corporativo.html` | Corporate Pro — Gamificación Completa — PuntoEvento |

## Cómo Ejecutar

Servidor local con Laragon:

```
http://localhost/puntoevento/_web/index.html
```

## Stack

- HTML5 semántico
- Tailwind CSS (CDN)
- CSS custom properties (design tokens)
- JavaScript vanilla (sin dependencias)
- Fuentes: Cabinet Grotesk + Satoshi (Fontshare)
- Webhook: Discord (formulario de contacto)

## Colores por Producto

| Producto | Color | Variable CSS |
|----------|-------|--------------|
| Puntos | Azul | `--color-points: oklch(62% 0.18 250)` |
| Eventos | Rojo | `--color-events: oklch(58% 0.20 25)` |
| Corporativo | Púrpura | `--color-corporate: oklch(62% 0.21 300)` |

## Funcionalidades

- **Simulador interactivo** con 3 modos: Puntos, Eventos, Combinado
- **Marca blanca** personalizable (nombre de moneda, icono, color)
- **Formulario de contacto** con captcha que envía a Discord webhook
- **Modal de pricing** al seleccionar un plan
- **Control de acceso** via localStorage
- **Tickets digitales** con QR y código único
- **Catálogo de canjes** con progreso y niveles

## SEO Implementado

- `<title>` y `<meta description>` únicos por página
- `<meta property="og:*">` por página (Open Graph)
- `<link rel="canonical">` por página
- `<script type="application/ld+json">` (Schema.org)
- `lang="es"` en HTML
- `sitemap.xml` con todas las URLs
- `robots.txt` con sitemap referenciado
- Estructura hub-and-spoke para keywords específicas
