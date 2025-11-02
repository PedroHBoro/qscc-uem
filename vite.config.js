import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});