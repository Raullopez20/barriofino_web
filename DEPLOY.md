# Guía rápida para desplegar Astro en GitHub Pages (rama gh-pages)

## 1. Compilar el proyecto

Abre una terminal y ejecuta:
```
cd barriofino_web
npm run build
```
Esto genera la carpeta `dist/` con los archivos listos para producción.

## 2. Desplegar a la rama gh-pages

Ejecuta:
```
npm run deploy
```
Este comando usa el paquete `gh-pages` para subir el contenido de `dist/` a la rama `gh-pages`.

## 3. Configurar GitHub Pages

- Ve a **Settings > Pages** en tu repositorio de GitHub.
- Selecciona la rama `gh-pages` y la carpeta raíz (`/`).
- Guarda los cambios.

## 4. Verificar el despliegue

- Accede a tu sitio: `https://raullopez20.github.io/barriofino_web/`
- Prueba una ruta inexistente: `https://raullopez20.github.io/barriofino_web/loquesea`
- Debes ver tu página principal y tu 404 personalizada.

## 5. ¿Qué hacer tras cada cambio?

1. Haz tus cambios en la rama `master` (o `main`).
2. Ejecuta `npm run build` y luego `npm run deploy` para actualizar el sitio en producción.

---

**Notas:**
- No necesitas copiar archivos manualmente a la rama `gh-pages`.
- El comando `npm run deploy` lo hace automáticamente.
- Si tienes problemas, revisa la rama `gh-pages` en GitHub y asegúrate que los archivos estén en la raíz.

---

**Comandos útiles:**
- Instalar gh-pages (si no lo tienes):
  ```
  npm install --save-dev gh-pages
  ```
- Compilar:
  ```
  npm run build
  ```
- Desplegar:
  ```
  npm run deploy
  ```

