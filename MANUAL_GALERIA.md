# Manual completo para la gestión de la galería multimedia

Este manual te explica paso a paso cómo añadir, organizar y actualizar fotos y vídeos en la galería de la web de BarrioFino. Sigue estos pasos para mantener la galería siempre actualizada y ordenada.

---

## 1. Estructura de carpetas

La galería se organiza automáticamente según la estructura de carpetas. Cada álbum debe tener su propia carpeta.

- **Fotos:**
  - Carpeta: `/public/assets/images/gallery/{nombre_album}/`
  - Ejemplo: `/public/assets/images/gallery/desfile_de_disfraces_2024/`
  - Dentro de cada carpeta, pon las imágenes (JPG, PNG, WEBP).

- **Vídeos:**
  - Carpeta: `/public/assets/videos/{nombre_album}/`
  - Ejemplo: `/public/assets/videos/desfile_de_disfraces_2024/`
  - Dentro de cada carpeta, pon los vídeos (MP4).

- **Miniaturas de vídeo:**
  - Carpeta: `/public/assets/images/video-thumbs/{nombre_album}/`
  - Ejemplo: `/public/assets/images/video-thumbs/desfile_de_disfraces_2024/`
  - Dentro de cada carpeta, pon las miniaturas (JPG) con el mismo nombre que el vídeo.

---

## 2. Añadir fotos

1. Crea una carpeta para el álbum en `/public/assets/images/gallery/` si no existe.
2. Sube las imágenes a esa carpeta. Ejemplo: `foto1.jpg`, `foto2.png`.
3. Usa nombres descriptivos y evita espacios (usa guiones bajos o medios).
4. Tamaño recomendado: 800x600px. Peso máximo: 2MB por imagen.

---

## 3. Añadir vídeos

1. Crea una carpeta para el álbum en `/public/assets/videos/` si no existe.
2. Sube los vídeos (formato MP4) a esa carpeta. Ejemplo: `video1.mp4`.
3. Sube la miniatura del vídeo a `/public/assets/images/video-thumbs/{nombre_album}/` con el mismo nombre que el vídeo pero extensión `.jpg`. Ejemplo: `video1.jpg`.
4. Tamaño recomendado de miniatura: 400x300px. Peso máximo: 1MB.

---

## 4. Actualizar la galería (generar gallery.json)

1. Abre una terminal en la carpeta del proyecto (`barriofino_web`).
2. Ejecuta el siguiente comando para generar el archivo actualizado:
   ```
   node public/data/generateGalleryJson.cjs
   ```
3. El archivo `/public/data/gallery.json` se actualizará automáticamente con todos los álbumes, fotos y vídeos detectados.

---

## 5. Visualizar y comprobar la galería

- Accede a la web y entra en la sección "Fotos y Vídeos".
- Verás los álbumes agrupados por tipo (fotos y vídeos).
- Cada álbum mostrará sus imágenes y vídeos.
- Haz clic en una imagen o vídeo para abrir el lightbox.

---

## 6. Eliminar archivos basura o innecesarios

- Borra cualquier archivo que no sea una imagen, vídeo o miniatura válida de las carpetas de álbumes.
- No dejes archivos temporales, duplicados o con nombres sin sentido.
- Elimina el archivo `generateGalleryJson.js` si existe (solo usa el `.cjs`).

---

## 7. Buenas prácticas

- Usa nombres de carpetas y archivos descriptivos y sin espacios.
- Mantén la estructura de carpetas limpia y ordenada.
- Repite el proceso cada vez que añadas o elimines fotos/vídeos.
- Si tienes dudas, revisa este manual o consulta con el administrador web.

---

## 8. Ejemplo de estructura

```
barriofino_web/
└── public/
    └── assets/
        ├── images/
        │   └── gallery/
        │       └── desfile_de_disfraces_2024/
        │           ├── foto1.jpg
        │           └── foto2.jpg
        ├── videos/
        │   └── desfile_de_disfraces_2024/
        │       └── video1.mp4
        └── images/
            └── video-thumbs/
                └── desfile_de_disfraces_2024/
                    └── video1.jpg
```

---

## 9. Preguntas frecuentes

**¿Por qué no aparece mi foto/vídeo en la galería?**
- Verifica que el archivo esté en la carpeta correcta y tenga el formato adecuado.
- Ejecuta el script para actualizar el JSON.

**¿Puedo tener varios álbumes?**
- Sí, cada carpeta dentro de `gallery` y `videos` es un álbum diferente.

**¿Puedo poner imágenes y vídeos en el mismo álbum?**
- Sí, solo asegúrate de que las carpetas tengan el mismo nombre para que se agrupen.

---

¡Listo! Con este manual puedes gestionar la galería de forma fácil y automática. Si tienes dudas, consulta este documento o contacta al responsable técnico.
