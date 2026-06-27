# Executive Transport

Aplicación web desarrollada en Angular 21 para presentar una marca de transporte ejecutivo con una experiencia visual premium, navegación por secciones, soporte multilenguaje y flujo de contacto integrado con WhatsApp, Instagram y EmailJS.

---

## 🚀 Descripción general

Este proyecto es una landing page moderna y responsiva para una empresa de transporte ejecutivo. La interfaz está pensada para transmitir prestigio, discreción y confiabilidad a través de:

- un hero section con llamada a la acción,
- una sección de presentación institucional,
- una galería de vehículos / flota,
- un módulo de feedback y contacto,
- navegación fija con selector de idioma.

La estructura actual está orientada a componentes standalone y servicios reutilizables, sin backend propio.

---

## ✅ Características principales

- Diseño premium en tonos negro, dorado y blanco.
- Layout responsive para escritorio, tablet y móvil.
- Navegación por anclas entre secciones principales.
- Selector de idioma en español, inglés y portugués.
- Integración con WhatsApp para solicitar servicios.
- Integración con Instagram para abrir el perfil de la marca.
- Formulario de feedback con envío vía EmailJS (si se configuran las variables de entorno).
- Persistencia del idioma seleccionado con localStorage.
- Arquitectura basada en componentes standalone de Angular.

---

## 🧰 Requisitos previos

Asegurate de tener instalado:

- Node.js 20 o superior
- npm 10 o superior

Verificá la instalación con:

```bash
node --version
npm --version
```

---

## 🔧 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd executive-transport
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación en modo desarrollo

```bash
npm start
```

La app quedará disponible en:

```text
http://localhost:4200
```

---

## 🛠️ Scripts disponibles

```bash
npm start        # inicia el servidor de desarrollo
npm run build    # compila la aplicación para producción
npm run watch    # compila en modo desarrollo y observa cambios
```

---

## ⚙️ Configuración de entorno

La app utiliza variables de entorno para los servicios de contacto.

Las variables esperadas son:

```env
NG_APP_PHONE=
NG_APP_PUBLIC_KEY_EMAIL=
NG_APP_SERVICE_ID=
NG_APP_TEMPLATE_ID=
```

Estas variables se leen desde los archivos de entorno de Angular:

- [src/environments/environment.ts](src/environments/environment.ts)
- [src/environments/environment.prod.ts](src/environments/environment.prod.ts)

> Si no se configuran, el flujo de WhatsApp e EmailJS podrá no funcionar correctamente.

---

## 🧱 Estructura del proyecto

```text
executive-transport/
├── angular.json
├── package.json
├── tsconfig.json
├── public/
│   └── assets/
│       └── images/
│           └── vehicles/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── about/
│   │   ├── contact/
│   │   ├── core/
│   │   │   ├── i18n/
│   │   │   └── services/
│   │   ├── fleet/
│   │   └── home/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
└── README.md
```

### Componentes principales

- [src/app/app.component.ts](src/app/app.component.ts): componente raíz con navbar, secciones y selector de idioma.
- [src/app/home/home.component.ts](src/app/home/home.component.ts): hero principal y CTA.
- [src/app/about/about.component.ts](src/app/about/about.component.ts): presentación institucional y servicios.
- [src/app/fleet/fleet.component.ts](src/app/fleet/fleet.component.ts): muestra la flota disponible.
- [src/app/contact/contact.component.ts](src/app/contact/contact.component.ts): feedback, contacto y footer.

### Servicios principales

- [src/app/core/services/translation.service.ts](src/app/core/services/translation.service.ts): gestión del idioma y traducciones dinámicas.
- [src/app/core/services/whatsapp.service.ts](src/app/core/services/whatsapp.service.ts): generación de enlaces a WhatsApp.
- [src/app/core/services/instagram.service.ts](src/app/core/services/instagram.service.ts): apertura del perfil de Instagram.
- [src/app/core/services/email.service.ts](src/app/core/services/email.service.ts): envío de feedback mediante EmailJS.

---

## 🌐 Internacionalización

La app cuenta con traducciones para:

- Español
- Inglés
- Portugués

Los textos se centralizan en la carpeta [src/app/core/i18n](src/app/core/i18n) y se consumen desde el servicio de traducciones.

---

## 📦 Tecnologías utilizadas

| Tecnología | Versión |
|------------|---------|
| Angular | 21.2.15 |
| TypeScript | 5.9.3 |
| RxJS | 7.8.0 |
| Angular CLI | 21.2.13 |
| SCSS | soportado por Angular |
| EmailJS | 4.4.1 |
| @ngx-env/builder | 21.0.1 |

---

## 📝 Notas importantes

- El proyecto funciona como una SPA de una sola página con secciones ancladas.
- El enrutamiento actual es mínimo y redirige a la vista principal.
- El formulario de contacto está preparado para enviar feedback si las credenciales de EmailJS están correctamente configuradas.
- Los recursos visuales e imágenes se encuentran en la carpeta pública del proyecto.

---

## 🆘 Solución de problemas comunes

### El comando npm start no funciona

Verificá que tengas una versión compatible de Node.js y que las dependencias estén instaladas correctamente:

```bash
npm install
```

### Error al abrir la app en el navegador

Asegurate de usar la URL:

```text
http://localhost:4200
```

### El formulario no envía feedback

Revisá que las variables de entorno de EmailJS estén definidas correctamente antes de construir o ejecutar la app.

---

© 2026 Executive Transport
