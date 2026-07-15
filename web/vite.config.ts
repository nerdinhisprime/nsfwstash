import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', 'API_')
  return {
    plugins: [vue()],
    define: {
      __API_URL__: JSON.stringify(`http://${env.API_HOST}:${env.API_PORT}`)
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@widgets': resolve(__dirname, 'src/widgets'),
        '@features': resolve(__dirname, 'src/features'),
        '@entities': resolve(__dirname, 'src/entities'),
        '@shared': resolve(__dirname, 'src/shared'),
      }
    },
  }
});
