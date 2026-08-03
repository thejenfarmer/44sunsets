import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static-host friendly: relative base so it works on Vercel/Netlify/gh-pages.
export default defineConfig({
  plugins: [react()],
  base: './',
})
