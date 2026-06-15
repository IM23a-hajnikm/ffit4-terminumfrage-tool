import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    coverage: {
      exclude: ['src/**/*.test.{ts,tsx}', 'src/test/**'],
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['text', 'lcov']
    },
    environment: 'node',
    setupFiles: ['./src/test/setup.ts']
  }
});
