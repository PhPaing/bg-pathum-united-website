import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/dify": {
        target: "http://10.210.40.16",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dify/, ""),
      },
      // Add proxy for your ASP.NET API
      "/aspnet-api": {
        target: "https://localhost:7179",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/aspnet-api/, ""),
      },
    },
    cors: true,
  },
});