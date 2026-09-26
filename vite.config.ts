import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/bar-card.ts',
      formats: ['es'],
      fileName: () => 'bar-card-next.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'node',
  },
});
