import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,         // порт фронта
    https: false,       // отключаем проверку SSL, если бэк с самоподписным сертификатом
    proxy: {
      '/api1': {
        target: 'https://localhost:2828/api/v1',
        changeOrigin: true,   // нужно для CORS
        secure: false,        // игнорируем самоподписной сертификат
        rewrite: path => path.replace(/^\/api1/, '') // убираем /api1 перед отправкой на бэк
      },
      '/api2': {
        target: 'https://localhost:2929/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api2/, '')
      },
    },
  },
})
