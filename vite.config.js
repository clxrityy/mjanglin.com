import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        "../styled-components",
        "../react-icons/ai",
        "../react-icons/si",
        "../react-icons/bs",
        "../react-icons/im",
        "@react-three/fiber",
        "@react-three/drei",
      ]
    }
  },
})
