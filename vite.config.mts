import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// For GitHub Pages: base must be '/REPO_NAME/' (e.g. '/cehmefe/'). Use '/' for username.github.io.
export default defineConfig({
  base: '/cehmefe/',
  plugins: [react(), tailwindcss()],
});


