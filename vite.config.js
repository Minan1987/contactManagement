import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/contact-management-app/',
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.jpg'],
  server: {
    proxy: {
      '/api': 'http://localhost:9000'
    }
  }
})
