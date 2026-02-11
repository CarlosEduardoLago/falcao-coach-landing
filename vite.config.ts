import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? '/falcao-coach-landing/' : '/',
  server: {
    host: true,
    port: 5173,
    strictPort: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
