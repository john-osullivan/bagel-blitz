import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import string from 'vite-plugin-string';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    string({
      include: '**/*.csv'
    })],
  css: {
    postcss: './postcss.config.cjs'
  }
})
