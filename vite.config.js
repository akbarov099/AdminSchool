import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://api.39ortomekteb.info',
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
