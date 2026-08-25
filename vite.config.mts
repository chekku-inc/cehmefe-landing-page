import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        'blog-ultrasonido-segun-semana': resolve(rootDir, 'blog/ultrasonido-segun-semana/index.html'),
        'blog-hera-z20-tecnologia': resolve(rootDir, 'blog/hera-z20-tecnologia/index.html'),
        'blog-modelos-3d-accesibilidad': resolve(rootDir, 'blog/modelos-3d-accesibilidad/index.html'),
        'blog-primer-ultrasonido-embarazo': resolve(rootDir, 'blog/primer-ultrasonido-embarazo/index.html'),
        'blog-tamizaje-primer-trimestre': resolve(rootDir, 'blog/tamizaje-primer-trimestre/index.html'),
        'blog-ultrasonido-morfologia-fetal': resolve(rootDir, 'blog/ultrasonido-morfologia-fetal/index.html'),
      },
    },
  },
});
