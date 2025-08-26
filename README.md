# 🎭 Sitio Web Peña BarrioFino

Sitio web profesional para la **Peña BarrioFino** desarrollado con **Astro + React**, diseñado para ser rápido, responsive y fácil de mantener.

## 🚀 Tecnologías Utilizadas

- **[Astro](https://astro.build/)** - Framework principal
- **[React](https://reactjs.org/)** - Componentes dinámicos
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilos y diseño responsive
- **[AOS](https://michalsnik.github.io/aos/)** - Animaciones suaves al scroll
- **GitHub Pages** - Despliegue y hosting

## 📁 Estructura del Proyecto

```
barrio-fino/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── gallery/          # Fotos de la galería
│   │   │   ├── events/           # Imágenes de eventos  
│   │   │   └── video-thumbs/     # Miniaturas de vídeos
│   │   └── videos/               # Archivos de vídeo
│   └── data/
│       ├── events.json           # Datos de eventos
│       └── gallery.json          # Datos de galería
├── src/
│   ├── components/
│   │   ├── Gallery.jsx           # Galería de fotos/vídeos
│   │   ├── EventsCalendar.jsx    # Calendario de eventos
│   │   └── ContactForm.jsx       # Formulario de contacto
│   ├── layouts/
│   │   └── BaseLayout.astro      # Layout principal
│   └── pages/
│       ├── index.astro           # Página de inicio
│       ├── historia.astro        # Historia de la peña
│       ├── fotos-videos.astro    # Galería multimedia
│       ├── eventos.astro         # Eventos y calendario
│       └── contacto.astro        # Página de contacto
├── package.json
├── astro.config.mjs
└── tailwind.config.mjs
```

## 🛠️ Instalación y Desarrollo

### Requisitos Previos
- Node.js 18+
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/barrio-fino.git
   cd barrio-fino
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar para tu repositorio**
    - Edita `astro.config.mjs` y cambia `base: '/barrio-fino'` por el nombre de tu repositorio
    - Actualiza la URL en `site: 'https://tu-usuario.github.io'`

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Acceder al sitio**
    - Abre tu navegador en `http://localhost:4321`

## 📝 Cómo Actualizar Contenido

### ✏️ Eventos
1. Edita el archivo `/public/data/events.json`
2. Añade o modifica eventos siguiendo esta estructura:
   ```json
   {
     "id": 1,
     "title": "Nombre del evento",
     "date": "2025-02-15",
     "time": "18:00",
     "location": "Ubicación",
     "description": "Descripción del evento",
     "image": "/assets/images/events/imagen.jpg"
   }
   ```
3. Sube las imágenes de eventos a `/public/assets/images/events/`

### 📸 Galería de Fotos
1. Sube las imágenes a `/public/assets/images/gallery/`
2. Crea o actualiza `/public/data/gallery.json`:
   ```json
   {
     "fotos": [
       {
         "id": 1,
         "src": "/assets/images/gallery/foto.jpg",
         "alt": "Descripción de la foto",
         "title": "Título",
         "year": "2025"
       }
     ]
   }
   ```

### 🎥 Vídeos
1. Sube los vídeos a `/public/assets/videos/`
2. Sube las miniaturas a `/public/assets/images/video-thumbs/`
3. Actualiza la sección `videos` en `/public/data/gallery.json`

### 📄 Textos de las Páginas
- **Inicio**: Edita `/src/pages/index.astro`
- **Historia**: Edita `/src/pages/historia.astro`
- **Contacto**: Edita `/src/pages/contacto.astro`

## 🚀 Despliegue en GitHub Pages

### Configuración Inicial
1. **Crear repositorio en GitHub**
    - Nombre sugerido: `barrio-fino` o `peña-barrio-fino`

2. **Configurar GitHub Pages**
    - Ve a Settings → Pages
    - Source: GitHub Actions
    - Crea el workflow `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Despliegue Manual
```bash
# Construir el sitio
npm run build

# Desplegar (requiere configurar gh-pages)
npm run deploy
```

## 🎨 Personalización de Estilos

### Colores
- El sitio usa una paleta **monocromática** (blanco, negro, grises)
- Para cambiar colores, edita `tailwind.config.mjs`

### Tipografía
- Fuente principal: **Inter** (moderna y legible)
- Se carga desde Google Fonts en `BaseLayout.astro`

### Animaciones
- Usa **AOS (Animate On Scroll)** para animaciones suaves
- Configuración en `BaseLayout.astro`

## 📱 Características Responsive

- **Mobile-first**: Diseñado primero para móvil
- **Breakpoints**:
    - `sm`: 640px+
    - `md`: 768px+
    - `lg`: 1024px+
    - `xl`: 1280px+

## 🔧 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Construir para producción |
| `npm run preview` | Previsualizar build local |
| `npm run deploy` | Desplegar a GitHub Pages |

## 📞 Soporte y Contacto

### Para Desarrolladores
- Revisa la documentación de [Astro](https://docs.astro.build/)
- Consulta [Tailwind CSS](https://tailwindcss.com/docs) para estilos
- Issues y problemas: [GitHub Issues](https://github.com/tu-usuario/barrio-fino/issues)

### Para Administradores de Contenido
- Los archivos JSON en `/public/data/` contienen todo el contenido editable
- Las imágenes van en `/public/assets/`
- No necesitas tocar código para actualizar eventos o galería

## 📄 Licencia

Este proyecto está desarrollado específicamente para la **Peña Barrio Fino**.

---

**Desarrollado con ❤️ para la Peña BarrioFino**