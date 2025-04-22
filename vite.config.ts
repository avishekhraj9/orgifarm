
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set root to process.cwd() to find package.json in the current working directory
  root: process.cwd(),
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    hmr: {
      clientPort: 8080
    },
    // Add file system options to help with package resolution
    fs: {
      strict: false,
      allow: ['..', '/']
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/', // Ensure assets are loaded from the root path
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // Add this to help with file resolution
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  }
}));
