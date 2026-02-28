import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },

  plugins: [
    tsconfigPaths(),
    react()
  ],

 server: {
  port: 4028,
  host: "0.0.0.0",
  strictPort: true,
  historyApiFallback: true,   // 🔥 ADD THIS

  proxy: {
    "/api": {
      target: "https://smartfit-backend-q4l6.onrender.com",
      changeOrigin: true,
    },
  },
},
});