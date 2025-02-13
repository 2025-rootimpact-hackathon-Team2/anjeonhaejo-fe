import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['anjeons.com'],
  },
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@api', replacement: '/src/api' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@store', replacement: '/src/store' },
      { find: '@', replacement: '/src' },
    ],
  },
});
