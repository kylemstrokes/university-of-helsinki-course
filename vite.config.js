import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

    preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
    allowedHosts: [
      "university-of-helsinki-course-1.onrender.com",
      // or ".onrender.com"
    ],
  },
  server: {
    host: true, // listen on 0.0.0.0
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
    allowedHosts: [
      "university-of-helsinki-course-1.onrender.com",
      // or use a wildcard-style entry:
      // ".onrender.com",
    ],
  },
})


