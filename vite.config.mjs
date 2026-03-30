import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build",
    // 🚀 PERFORMANCE: No source maps in production (smaller build, faster deploy)
    sourcemap: false,
    rollupOptions: {
      output: {
        // 🚀 PERFORMANCE: Vendor chunk splitting for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // React core — must be in its own chunk
            if (id.includes('react-dom') || id.includes('react-router') ||
                (id.includes('/react/') && !id.includes('react-leaflet'))) {
              return 'react-vendor';
            }
            // Charts (recharts uses react internally, so keep d3 separate)
            if (id.includes('d3-') || id.includes('/d3/')) {
              return 'd3-vendor';
            }
            if (id.includes('recharts')) {
              return 'chart-vendor';
            }
            // Maps
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'map-vendor';
            }
            // UI libraries
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
          }
        },
      },
    },
  },

  plugins: [
    tsconfigPaths(),
    react()
  ],

 server: {
  port: 4028,
  host: "0.0.0.0",
  strictPort: true,
  historyApiFallback: true,

  proxy: {
    "/api": {
      target: "https://smartfit-backend-q4l6.onrender.com",
      changeOrigin: true,
    },
  },
},
});