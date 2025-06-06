import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",        // Escucha en todas las interfaces
    port: 5173,             // Puerto por defecto de Vite
    strictPort: true,       // No cambia automáticamente si el puerto está ocupado
    origin: false,          // No valida el host remoto
    hmr: {
      clientPort: 5173      // Hot Module Reload para clientes externos
    }
  }
})
