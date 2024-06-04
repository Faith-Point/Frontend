import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // Defina a raiz como o diretório atual
  build: {
    outDir: 'dist', // Diretório de saída para o build
    rollupOptions: {
      input: '/public/index.html', // Caminho para o index.html
    },
  },
});
