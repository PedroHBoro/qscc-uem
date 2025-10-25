import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    open: true,
    // Adiciona a configuração de proxy
    proxy: {
      // Redireciona qualquer requisição que comece com /api
      '/api': {
        target: 'http://localhost:3001', // O endereço do nosso servidor de API local
        changeOrigin: true, // Necessário para o redirecionamento funcionar corretamente
      },
    },
  },
});
