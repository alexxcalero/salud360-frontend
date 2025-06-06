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
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [
      "ec2-3-86-240-219.compute-1.amazonaws.com",
      "localhost",
      "127.0.0.1"
    ],
    strictPort: true,
    cors: true,
    hmr: {
      clientPort: 5173,
    },
  },
})
