import { defineConfig } from 'vitest/config';

export default defineConfig({
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
