import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
const BACKEND_PORT = 8080;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "ec2-3-86-240-219.compute-1.amazonaws.com",
      "ec2-54-91-52-110.compute-1.amazonaws.com",
      "ec2-3-226-224-118.compute-1.amazonaws.com",
      "localhost",
      "127.0.0.1",
    ],
    strictPort: true,
    host: "0.0.0.0",

    // Para que me dejara usar el S3 en el back
    proxy: {
      "/api": {
        target: `http://localhost:${BACKEND_PORT}`,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
