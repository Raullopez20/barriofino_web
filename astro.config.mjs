import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// Configuración para GitHub Pages
// Cambia 'barrio-fino' por el nombre de tu repositorio
export default defineConfig({
    site: 'https://Raullopez20.github.io',
    base: '/barriofino_web/',
    integrations: [
        react(),
        tailwind()
    ],
    output: 'static',
    build: {
        assets: 'assets'
    }
});