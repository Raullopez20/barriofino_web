# Guía rápida para desplegar Astro en Netlify

## 1. Compilar el proyecto

Abre una terminal y ejecuta:
```
cd barriofino_web
npm run build
```
Esto genera la carpeta `dist/` con los archivos listos para producción.

## 2. Configurar Netlify

1. Ve a [Netlify](https://app.netlify.com/) y crea una cuenta si no tienes una.
2. Crea un nuevo sitio desde Git y selecciona tu repositorio.
3. Configura los siguientes parámetros:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Haz clic en **Deploy Site**.

## 3. Verificar el despliegue

- Accede a la URL proporcionada por Netlify (por ejemplo, `https://tu-sitio.netlify.app`).
- Prueba una ruta inexistente (por ejemplo, `https://tu-sitio.netlify.app/loquesea`).
- Debes ver tu página principal o tu 404 personalizada.

## 4. ¿Qué hacer tras cada cambio?

1. Haz tus cambios en la rama `master` (o `main`).
2. Netlify detectará automáticamente los cambios y desplegará la nueva versión del sitio.

---

**Notas:**
- No necesitas ejecutar comandos manuales para desplegar.
- Netlify se encarga de todo el proceso automáticamente.
- Si tienes problemas, revisa los registros de construcción en Netlify.
