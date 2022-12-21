import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import svgr from 'vite-plugin-svgr'
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [svgr(), react(), visualizer()] as any,
  test: {
    environment: 'jsdom'
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
