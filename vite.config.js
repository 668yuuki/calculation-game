import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    deps: {
      inline: [/vuetify/],
    },
    exclude: ['node_modules', 'dist'],
  },
  esbuild: {
    loader: {
      '.css': 'text',
    },
  },
})
