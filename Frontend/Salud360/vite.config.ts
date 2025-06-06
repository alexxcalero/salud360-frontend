import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',         // Escucha en todas las interfaces (IP pública incluida)
    port: 5173,              // Puerto accesible desde fuera
    strictPort: true,        // No se cambia automáticamente si está ocupado
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    },
    cors: true               // Habilita CORS por si accedes desde otro origen
  }
})
