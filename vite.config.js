import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  build: { outDir: 'dist' },
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.jpg'],
  server: {
    proxy: { '/api': 'http://localhost:3001' }
  }
})

