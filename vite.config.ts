import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base relativa: funciona tanto en la raíz de un dominio (Netlify)
// como en un subdirectorio de GitHub Pages (usuario.github.io/repo/)
// sin necesitar configuración adicional.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
  },
})
