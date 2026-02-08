import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Added for Tailwind v4
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Added for Tailwind v4
  ],
  resolve: {
    // PRESERVED: Your existing aliases
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  server: {
    port: 5173, // Default Vite port
    proxy: {
      // PROXY SETUP: Redirects /api requests to your backend
      '/api': {
        target: 'http://127.0.0.1:8000', // CHANGE THIS to your actual backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})