import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.39ortomekteb.info',
        changeOrigin: true,
        secure: false,
      },
      '/images': {  // Optional: to handle CORS for images from static.bbk.kg
        target: 'https://static.bbk.kg',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/images/, ''),
      },
    },
  },
});
