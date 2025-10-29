import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    https: false,
    proxy: {
      '/api1': {
        target: 'https://localhost:2828/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api1/, '')
      },
      '/api2': {
        target: 'https://localhost:2929/api/v1/shop/search',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api2/, '')
      },
    },
  },
})
