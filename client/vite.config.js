import { defineConfig } from 'vite'
import home from "@vitejs/plugin-react"
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [home(),    tailwindcss(),
],
})
