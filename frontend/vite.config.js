import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeConsole from 'vite-plugin-remove-console'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    removeConsole()
  ],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000/',
    },
  },
  build: {
    chunkSizeWarningLimit: 1000 // Set a higher or lower limit as needed
  }
})