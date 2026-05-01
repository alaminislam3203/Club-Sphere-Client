import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('react-icons')) return 'react-icons';
            if (id.includes('@stripe')) return 'stripe';
            if (id.includes('axios')) return 'axios';
            if (id.includes('sweetalert2')) return 'sweetalert2';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
