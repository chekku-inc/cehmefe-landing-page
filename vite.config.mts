import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// For GitHub Pages: base must match repo name. Repo is cehmefe-landing-page.
export default defineConfig({
  base: '/cehmefe-landing-page/',
  plugins: [react(), tailwindcss()],
});


