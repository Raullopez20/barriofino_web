import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: 'https://barriofino.netlify.app',
    base: '/',
    output: 'static',
    integrations: [
        react(),
        tailwind(),
        [sitemap()]
    ],
    build: {
        assets: 'assets'
    }
});