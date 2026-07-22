# 🚀 Visión de Futuro: El Ecosistema Multi-Tenant Global de PuntoEvento

## 1. Introducción y Concepto Core

La visión de futuro para **PuntoEvento** es evolucionar desde un software de evento único hacia una **red global multi-tenant centralizada**, funcionando de manera similar a un "CryptoMarket" de fidelización y gamificación social.

En este ecosistema global:
1.  **Identidad Única de Usuario (Global Passport)**: Un usuario se registra una sola vez en la plataforma global. Este perfil único le otorga un pasaporte digital que puede vincularse y unirse a múltiples organizaciones o clientes (**Tenants**).
2.  **Billetera Multi-Moneda (Multi-Tenant Wallet)**: Cada Tenant emite su propia moneda digital interna, exclusiva y no comercializable (no transferible entre usuarios ni entre Tenants). La billetera del usuario centraliza los saldos de cada organización a la que pertenece (ej. *“Tienes 450 Puntos Muni-Cultura, 2,000 Puntos Empresa-A y 3 Medallas del Club Deportivo”*).
3.  **Muro de Descubrimiento (Tenant Wall/Directory)**: Un escaparate público donde las personas pueden descubrir Tenants públicos a los que unirse directamente, o ingresar a Tenants privados exclusivamente mediante invitaciones o códigos de acceso empresarial corporativos.

---

## 2. Diagrama de la Arquitectura del Ecosistema

Este diagrama visualiza cómo la identidad del usuario unifica sus carteras, mientras los administradores de cada Tenant controlan de forma 100% aislada sus propias dinámicas, recompensas y monedas:

```mermaid
graph TD
    subgraph "🌐 Capa Global (PuntoEvento Hub)"
        U["👤 Cuenta Única de Usuario"]
        TW["🧭 Muro de Tenants (Públicos / Privados)"]
    end

    subgraph "💼 Billetera Centralizada (Multi-Wallet)"
        U --> W1["🪙 Cartera Tenant A <br> (Muni Cultura)"]
        U --> W2["🪙 Cartera Tenant B <br> (Empresa B2B)"]
        U --> W3["🪙 Cartera Tenant C <br> (Club E-Sports)"]
    end

    subgraph "🏢 Capa Multi-Tenant Aislada"
        W1 --> TA["🏢 Tenant A (Muni Cultura)"]
        W2 --> TB["🏢 Tenant B (Empresa B2B)"]
        W3 --> TC["🏢 Tenant C (Club E-Sports)"]

        TA -->|Administración propia| G1["🏆 Eventos, Medallas, Certificados e Invitaciones"]
        TB -->|Administración propia| G2["📊 KPIs, Microsoft SSO y Auditoría"]
        TC -->|Administración propia| G3["🎮 Desafíos Gaming y Canjes en Sucursal"]
    end

    style U fill:#4f46e5,stroke:#333,stroke-width:2px,color:#fff
    style TW fill:#f59e0b,stroke:#333,stroke-width:1px,color:#fff
    style W1 fill:#10b981,stroke:#333,color:#fff
    style W2 fill:#10b981,stroke:#333,color:#fff
    style W3 fill:#10b981,stroke:#333,color:#fff
```

---

## 3. Modelo de Datos Conceptual (Relaciones de Base de Datos)

Para lograr esta arquitectura altamente flexible y escalable con un modelo único, se propone la siguiente estructura de datos relacional:

```mermaid
erDiagram
    USERS {
        bigint id PK
        string email
        string password
        string name
        string avatar
    }

    TENANTS {
        bigint id PK
        string slug
        string name
        string logo
        string primary_color
        boolean is_public
    }

    TENANT_USER {
        bigint tenant_id FK
        bigint user_id FK
        string role
        datetime joined_at
    }

    WALLETS {
        bigint id PK
        bigint tenant_id FK
        bigint user_id FK
        integer balance_coins
    }

    EVENTS {
        bigint id PK
        bigint tenant_id FK
        string name
        string code
    }

    AWARDS {
        bigint id PK
        bigint tenant_id FK
        string type "badge | medal | certificate"
        string name
        string image_path
    }

    USER_AWARDS {
        bigint id PK
        bigint user_id FK
        bigint award_id FK
        datetime earned_at
    }

    USERS ||--o{ TENANT_USER : belongs_to
    TENANTS ||--o{ TENANT_USER : hosts
    USERS ||--o{ WALLETS : owns
    TENANTS ||--o{ WALLETS : configures
    TENANTS ||--o{ EVENTS : organizes
    TENANTS ||--o{ AWARDS : defines
    USERS ||--o{ USER_AWARDS : receives
    AWARDS ||--o{ USER_AWARDS : awarded_by
```

---

## 4. Los Pilares de la Experiencia Multi-Tenant

### A. Muro de Tenants (El Directorio del Ecosistema)
*   **Acceso Público (Descubrimiento)**: Entidades públicas como Municipalidades, ONGs o Universidades listan sus perfiles en el "Muro de Tenants" abierto. Cualquier usuario puede explorar el muro, ver las actividades culturales/recreativas vigentes y hacer clic en *"Unirse"* para generar automáticamente su billetera de puntos para esa organización.
*   **Acceso Privado (Invitación / SSO)**: Las corporaciones operan de manera invisible en el muro público. Solo se puede ingresar si se recibe un enlace de invitación único, un código QR administrativo o mediante validación directa de correo empresarial a través de Microsoft Single Sign-On (SSO).

### B. Módulos de Recompensas Avanzados
Cada Tenant, de forma independiente, activa y gestiona los módulos de recompensa que se adapten a sus objetivos:
1.  **Asistencias y Participación**: Marcaje instantáneo por lectura de QR administrado o geolocalización en eventos culturales, deportivos y corporativos.
2.  **Insignias y Medallas Gamificadas (Digital Badges)**: Logros coleccionables ilustrados para perfiles virtuales (ej. *"Medalla de Asistencia Perfecta"*, *"Insignia de Colaborador Proactivo"*).
3.  **Certificados Digitales con Validación Única (Blockchain/PDF)**: Generación automática de diplomas y certificados de participación con firma digital verificable por código QR para validar su autenticidad curricular.

---

## 5. Caso de Éxito de la Proyección: El Ecosistema Municipal

Imaginemos el impacto de PuntoEvento en la gestión pública local mediante un **Tenant Municipal**:

1.  **Activación de Actividades**: La municipalidad crea el evento *"Festival de Teatro de Otoño"*.
2.  **Participación**: Vecinos asisten a las obras de teatro gratuitas. En el ingreso, escanean el código QR en el stand cultural y reciben de inmediato **50 "Muni-Puntos"** y la **"Medalla de Fomento de las Artes"** en su pasaporte digital.
3.  **Diplomas**: Si un vecino asiste a 4 obras de teatro durante el ciclo, el sistema genera automáticamente un **Certificado Digital de Fomento Cultural** firmado por el Alcalde que se descarga como PDF verificable.
4.  **Canje Sostenible**: La municipalidad asocia puntos de canje con emprendedores locales. El vecino acude a la feria de emprendedores ("Sucursal de Canje") y utiliza sus Muni-Puntos para obtener descuentos en productos locales o entradas prioritarias para el próximo concierto municipal.
