import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Automáticamente detecta y expone en todas las interfaces
    port: 5173, // Puerto específico
    strictPort: false, // Permite usar otro puerto si 5173 está ocupado
    open: false, // No abrir automáticamente en el navegador
    cors: true, // Habilitar CORS
    proxy: {
      '/api': {
        target: 'https://prontodelivery.lat',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Agregar headers para simular una request desde un dominio válido
            proxyReq.setHeader('Origin', 'https://prontodelivery.lat');
            proxyReq.setHeader('Referer', 'https://prontodelivery.lat');
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
          });
        }
      }
    }
  }
})
