import { posts } from './node_modules/@reduxjs/toolkit/src/query/tests/mocks/server';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3020,
  }
})
