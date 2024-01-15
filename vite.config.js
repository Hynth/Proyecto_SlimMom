import ReactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    plugins: [ReactRefresh(), injectHTML(), FullReload(['./src/**/**.html'])],
    build: {
      sourcemap: true,
      outDir: '../dist',
      rollupOptions: {
        input: {
          main: './calorieCalculator/index.jsx',
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'], // Añade otras dependencias si las necesitas
    },
  };
});
