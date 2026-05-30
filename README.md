# Executive Transport — Demo de Plantillas Web

Proyecto Angular 19 con **3 plantillas visuales profesionales** para empresa de transporte ejecutivo.

---

## 📋 Requisitos previos

### 1. Instalar Node.js

Descargá Node.js versión **18 o superior** desde:
👉 https://nodejs.org/en/download

Verificá la instalación:
```bash
node --version   # debe mostrar v18.x.x o superior
npm --version    # debe mostrar 9.x.x o superior
```

### 2. Instalar Angular CLI

```bash
npm install -g @angular/cli
```

Verificá:
```bash
ng version
```

---

## 🚀 Instalación y ejecución

### Paso 1 — Abrir el proyecto en VS Code

1. Abrí Visual Studio Code
2. `Archivo` → `Abrir carpeta`
3. Seleccioná la carpeta **executive-transport**

### Paso 2 — Abrir terminal integrado

En VS Code: `Terminal` → `Nueva terminal` (o `Ctrl + ñ`)

### Paso 3 — Instalar dependencias

```bash
npm install
```

> Esto descarga todos los paquetes necesarios. Puede tardar 1-2 minutos.

### Paso 4 — Ejecutar el servidor de desarrollo

```bash
ng serve
```

> El proyecto se compila y queda disponible en:
> **http://localhost:4200**

---

## 🎨 Cómo ver las 3 plantillas

Una vez iniciado el servidor, abrí tu navegador en **http://localhost:4200**

Verás la **pantalla de selección de plantillas**. Desde ahí podés navegar a cada una:

| Plantilla | URL directa | Estilo |
|-----------|-------------|--------|
| 🔵 Corporativa | http://localhost:4200/#/template1 | Azul oscuro · Blanco · Gris |
| ⚡ Tecnológica | http://localhost:4200/#/template2 | Gris oscuro · Celeste · Blanco |
| 🏆 Premium VIP | http://localhost:4200/#/template3 | Negro · Dorado · Blanco |

Cada plantilla incluye:
- **Hero / Inicio** — sección principal con CTA
- **Quiénes Somos** — descripción + 4 servicios en cards
- **Contacto** — formulario visual + iconos de redes + footer

---

## 🏗️ Estructura del proyecto

```
executive-transport/
├── src/
│   ├── app/
│   │   ├── app.component.ts        ← Componente raíz
│   │   ├── app.config.ts           ← Configuración Angular
│   │   ├── app.routes.ts           ← Rutas principales
│   │   ├── core/
│   │   │   └── selector/           ← Pantalla de selección
│   │   └── templates/
│   │       ├── template1/          ← Plantilla Corporativa (azul)
│   │       │   ├── home/
│   │       │   ├── about/
│   │       │   └── contact/
│   │       ├── template2/          ← Plantilla Tecnológica (celeste)
│   │       │   ├── home/
│   │       │   ├── about/
│   │       │   └── contact/
│   │       └── template3/          ← Plantilla VIP (dorado)
│   │           ├── home/
│   │           ├── about/
│   │           └── contact/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Comandos útiles

```bash
# Iniciar servidor de desarrollo
ng serve

# Iniciar en un puerto diferente
ng serve --port 4201

# Build de producción
ng build

# Build con preview local
ng build && npx http-server dist/executive-transport/browser
```

---

## ⚙️ Tecnologías utilizadas

| Tecnología | Versión |
|------------|---------|
| Angular | 19 |
| TypeScript | 5.6 |
| SCSS | — |
| Google Fonts | Cormorant Garamond, Montserrat, Cinzel, Rajdhani |

---

## 📝 Notas

- El formulario de contacto es **visual únicamente** (no envía datos reales)
- El proyecto es **completamente estático** (sin backend ni base de datos)
- Todos los componentes son **standalone** (Angular moderno)
- El routing usa **hash location** para compatibilidad estática (`#/template1`)
- Las plantillas son **responsive**: funcionan en celular, tablet y desktop

---

## 🆘 Solución de problemas comunes

**Error: `ng` no se reconoce como comando**
```bash
npm install -g @angular/cli
```

**Error al ejecutar `ng serve` (puerto en uso)**
```bash
ng serve --port 4201
```

**El `npm install` falla con errores de permisos (macOS/Linux)**
```bash
sudo npm install -g @angular/cli
```

**Pantalla en blanco al abrir el navegador**
- Asegurate de usar la URL con `#`: http://localhost:4200/#/selector
- Esperá que la compilación termine (verás `✔ Compiled successfully`)

---

*Demo profesional — Executive Transport © 2026*
