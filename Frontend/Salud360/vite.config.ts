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
  server:{
    allowedHosts: [
        "ec2-3-86-240-219.compute-1.amazonaws.com",
        "localhost",
        "127.0.0.1",
        // Puedes agregar otros dominios aquí si quieres
      ],
    strictPort: true,
    host: "0.0.0.0"
  }
})
