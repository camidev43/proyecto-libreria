/// <reference types="vitest" />
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'production';

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [
      react(),

      isLibraryBuild &&
        dts({
          include: ['src/lib'],
          rollupTypes: true,
        }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/lib/index.ts'),
        formats: ['es', 'umd'],
        name: 'CoreKitUI',
        fileName: format => `index.${format === 'es' ? 'js' : 'umd.cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      passWithNoTests: true,

      setupFiles: './src/test/vitest.setup.ts',
      css: true,
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  };
});
