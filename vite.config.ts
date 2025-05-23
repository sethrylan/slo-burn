import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: '/slo-burn/',
    plugins: [react()],
    server: {    
        open: true,
        port: 3000, 
    }
  };
});
