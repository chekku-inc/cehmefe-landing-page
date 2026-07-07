import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        'blog-ultrasonido-segun-semana': resolve(rootDir, 'blog/ultrasonido-segun-semana/index.html'),
        'blog-hera-z20-tecnologia': resolve(rootDir, 'blog/hera-z20-tecnologia/index.html'),
        'blog-modelos-3d-accesibilidad': resolve(rootDir, 'blog/modelos-3d-accesibilidad/index.html'),
      },
    },
  },
});
