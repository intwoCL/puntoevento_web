# Plan Estratégico — PuntoEvento Landing Page

**Fecha:** Julio 2026
**Objetivo:** Maximizar SEO, visibilidad y conversión para la plataforma B2B de gamificación.

---

## 1. Situación Actual

| Aspecto | Estado |
|---------|--------|
| Páginas | 1 sola página (index2.html) con todo el contenido |
| Productos | 3 planes visibles (Puntos Express, Eventos Express, Corporate Pro) + Enterprise |
| SEO on-page | Básico (title + description únicos) |
| Dominio | puntoevento.com (asumido) |
| Formulario | Discord webhook funcional |
| Demo interactiva | Simulador con 3 modos |

**Problema principal:** Una sola página intenta posicionar "puntos corporativos", "eventos corporativos" y "gamificación B2B" simultáneamente. Google no puede rankear una página para todos esos términos relacionados pero distintos.

---

## 2. Recomendación: Múltiples Páginas (Hub-and-Spoke)

### Por qué NO conviene mantener todo en una sola página

- Google premia la **relevancia específica**: una página sobre "puntos de fidelización" rankeará mejor que una que también habla de "eventos corporativos"
- Un usuario buscando "software de eventos corporativos" no quiere ver pricing de puntos
- El contenido duplicado interno (comparativa repite features) diluye la autoridad

### Estructura propuesta: 1 Hub + 3 Spokes

```
puntoevento.com/              → Hub: overview, CTA a subproductos
puntoevento.com/puntos/       → Puntos Express + features de fidelización
puntoevento.com/eventos/      → Eventos Express + features de gestión
puntoevento.com/corporativo/  → Corporate Pro + Enterprise (combinado)
```

### Beneficios SEO

| Beneficio | Impacto |
|-----------|---------|
| **Keywords específicas por página** | Alto — cada página rankea para su term principal |
| **Backlinks segmentados** | Alto — enlaces pueden apuntar a la página más relevante |
| **Experiencia de usuario** | Alto — el contenido es más relevante para la intención de búsqueda |
| **Featured snippets** | Medio — contenido estructurado y específico tiene más chances |
| **Menor tasa de rebote** | Medio — el usuario encuentra lo que busca sin navegar |

---

## 3. Contenido por Página

### 3.1 Hub Principal (`/`)
- Hero general de PuntoEvento
- Tabs para elegir módulo (Puntos / Eventos / Combinado)
- Comparativa visual de los 3 módulos
- CTA a cada subproducto
- Pricing resumen con links a páginas detalladas

### 3.2 Puntos (`/puntos/`)
- **H1:** "Gamificación de Puntos para Empresas"
- Hero con mockup de billetera de puntos
- Simulador de puntos (misiones → catálogo → canjes QR)
- Features: misiones, catálogo, locales asociados, control de stock
- Pricing: Puntos Express ($590/mes) + Corporate Pro ($4,800/año)
- Testimonios de clientes de fidelización
- CTA: "Solicitar Demo de Puntos"

### 3.3 Eventos (`/eventos/`)
- **H1:** "Gestión de Eventos Corporativos con Tickets Digitales"
- Hero con mockup de ticket digital + QR
- Simulador de eventos (registro → ticket → check-in)
- Features: registro, tickets QR, notificaciones push, gestión de stands
- Pricing: Eventos Express ($990/evento) + Corporate Pro ($4,800/año)
- Testimonios de organizadores de eventos
- CTA: "Solicitar Demo de Eventos"

### 3.4 Corporativo (`/corporativo/`)
- **H1:** "Plataforma Integral de Gamificación Corporativa"
- Hero combinando ambos módulos
- Simulador combinado (puntos + eventos)
- Features completas (todas las del comparativo actual)
- Pricing: Corporate Pro + Enterprise
- Case studies de empresas que usan ambos módulos
- CTA: "Agendar Consulta"

---

## 4. SEO On-Page (por página)

### 4.1 Títulos y Meta (ejemplos)

| Página | Title | Meta Description |
|--------|-------|------------------|
| Hub | "PuntoEvento — Gamificación Corporativa B2B" | "Plataforma de gamificación: economía de puntos y gestión de eventos corporativos. Marca blanca, SSO, API." |
| Puntos | "Puntos Corporativos y Fidelización — PuntoEvento" | "Crea una economía de puntos para fidelizar clientes y colaboradores. Misiones, catálogo de premios, canjes QR. Desde $590/mes." |
| Eventos | "Gestión de Eventos con Tickets Digitales — PuntoEvento" | "Organiza eventos corporativos con registro, tickets digitales QR y notificaciones push. Desde $990/evento." |
| Corporativo | "Corporate Pro — Gamificación Completa — PuntoEvento" | "Puntos + Eventos en una sola plataforma. SSO, marca blanca, API. Para empresas que quieren un ecosistema de engagement." |

### 4.2 Schema Markup (JSON-LD)

Cada página debe incluir:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PuntoEvento",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "590",
    "highPrice": "4800",
    "priceCurrency": "USD"
  }
}
```

Para pricing específico por página, usar `Product` + `Offer`.

### 4.3 URL Structure

```
puntoevento.com/                    ← canónica del hub
puntoevento.com/puntos/             ← canónica de puntos
puntoevento.com/eventos/            ← canónica de eventos
puntoevento.com/corporativo/        ← canónica de corporativo
```

Evitar: `?page=puntos`, `#puntos` (los fragmentos no se indexan como páginas separadas).

---

## 5. SEO Técnico

### 5.1 Elementos Críticos

- [ ] **Sitemap XML** — Generar con todas las URLs y `<lastmod>`
- [ ] **robots.txt** — Permitir todo, incluir sitemap
- [ ] **Canonical tags** — Cada página apunta a sí misma
- [ ] **Open Graph** — `og:title`, `og:description`, `og:image` por página
- [ ] **Twitter Cards** — `twitter:card`, `twitter:title`, `twitter:description`
- [ ] **Hreflang** — `<link rel="alternate" hreflang="es" href="...">` (si hay más idiomas)
- [ ] **Performance** — Lazy load de imágenes, minificar CSS/JS, preconnect a Fontshare

### 5.2 Imágenes

- Crear mockups/screenshots de cada módulo para usar como `og:image`
- Formato WebP con fallback JPEG
- Alt text descriptivo: "Simulador de puntos corporativos con billetera virtual y catálogo de premios"

### 5.3 Velocidad

- Tailwind CDN ya está en uso (aceptable para landing)
- Considerar Tailwind CLI para producción (elimina clases no usadas)
- Fonts: `font-display: swap` ya está configurado
- Imágenes: servir desde CDN o同一domain

---

## 6. SEO Off-Page y Visibilidad

### 6.1 Contenido Complementario (Blog)

Crear `/blog/` con artículos que enlacen a las landing pages:

| Artículo | Enlaza a |
|----------|----------|
| "Cómo crear un programa de puntos corporativos" | /puntos/ |
| "5 beneficios de tickets digitales para eventos" | /eventos/ |
| "Gamificación B2B: guía completa para 2026" | Hub + /corporativo/ |
| "Puntos vs descuentos: qué funciona mejor para fidelizar" | /puntos/ |
| "Organiza tu primera feria corporativa con tecnología" | /eventos/ |

### 6.2 Directorios y Listings

- [ ] Google Business Profile (si hay oficina física)
- [ ] Capterra / G2 / Software Advice (listings B2B)
- [ ] Directorios de software empresarial en español
- [ ] LinkedIn company page con posts regulares

### 6.3 Backlinks

- Guest posts en blogs de recursos humanos y marketing
- Colaboraciones con organizadores de eventos
- Cases studies compartidos por clientes
- Participación en ferias de tecnología empresarial

---

## 7. Visualización de los 3 Productos como Subproductos

### Recomendación: Sí, separar visualmente

**Actualmente:** Los 3 planes aparecen juntos en una grilla de 4 columnas. El usuario no entiende bien la diferencia entre "Puntos Express" y "Eventos Express".

**Propuesta:** Tarjetas de producto con identidad visual propia:

```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│  🔵 PUNTOS          │  │  🔴 EVENTOS         │  │  ⚡ COMBINADO       │
│  Express            │  │  Express            │  │  Corporate Pro      │
│                     │  │                     │  │                     │
│  Para fidelización  │  │  Para ferias y      │  │  Para empresas      │
│  de clientes y      │  │  congresos con      │  │  que quieren ambos  │
│  colaboradores      │  │  registro digital   │  │  módulos integrados │
│                     │  │                     │  │                     │
│  $590 USD/mes       │  │  $990 USD/evento    │  │  $4,800 USD/año     │
│  [Ver detalle →]    │  │  [Ver detalle →]    │  │  [Ver detalle →]    │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

**Cada tarjeta:**
- Color propio (azul para puntos, rojo para eventos, acento para combinado)
- Icono y nombre del módulo
- Descripción de 1 línea de "para qué sirve"
- Precio rápido
- Link a la landing dedicada
- Mockup pequeño del phone screen correspondiente

**En la comparativa:** Mantener la tabla de features, pero cada columna linka a su landing dedicada.

---

## 8. Implementación (Fases)

### Fase 1: Preparación (1-2 días)
- [ ] Crear estructura de carpetas ( assets/img/, pages/)
- [ ] Extraer contenido del index2.html en secciones reutilizables
- [ ] Crear template base (header, footer, meta tags compartidos)

### Fase 2: Landing Pages (3-5 días)
- [ ] Crear `/puntos/` con contenido específico de puntos
- [ ] Crear `/eventos/` con contenido específico de eventos
- [ ] Crear `/corporativo/` con contenido combinado
- [ ] Actualizar Hub (`/`) con links a subproductos

### Fase 3: SEO Técnico (1-2 días)
- [ ] Agregar schema markup a cada página
- [ ] Configurar Open Graph y Twitter Cards
- [ ] Crear sitemap.xml y robots.txt
- [ ] Agregar canonical tags

### Fase 4: Contenido y Off-Page (ongoing)
- [ ] Crear blog con 5 artículos iniciales
- [ ] Registrar en directorios B2B
- [ ] Configurar Google Search Console
- [ ] Monitorear posiciones con Ahrefs / SEMrush

---

## 9. Métricas de Éxito

| Métrica | Actual (estimado) | Objetivo 3 meses |
|---------|-------------------|------------------|
| Páginas indexadas | 1 | 4+ |
| Tráfico orgánico/mes | ~0 | 500+ visitas |
| Posición "puntos corporativos" | No rankea | Top 20 |
| Posición "eventos corporativos" | No rankea | Top 20 |
| Tasa de rebote | ~70% | <50% |
| Conversiones (formularios)/mes | ~0 | 10+ |

---

## 10. Resumen Ejecutivo

**La decisión clave:** Separar en múltiples páginas (hub + spokes) es significativamente mejor para SEO y conversión que mantener todo en una sola página.

**Por qué:**
1. Cada página puede posicionar para keywords específicas
2. La experiencia de usuario es más relevante
3. Los precios y features no compiten por atención en la misma vista
4. Google interpreta mejor la estructura del sitio

**El siguiente paso inmediato:** Decidir si procedemos con la estructura de múltiples páginas o si prefieres mantener la landing single-page y solo mejorar el SEO existente.
