import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.alias = {
      '@/lib/utils': './src/lib/utils',
      '@/components/ui': './src/components/ui',
      '@/hooks': './src/hooks',
    };
  },
});
