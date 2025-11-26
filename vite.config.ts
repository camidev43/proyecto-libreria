// vite.config.ts
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import external from '@yelo/rollup-node-external';
import hq from 'alias-hq';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: { alias: hq.get('rollup') },
  plugins: [react(), cssInjectedByJsPlugin(), dts({ rollupTypes: true, exclude: ['**/*.stories.{ts,tsx}'] })],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'PC DEMO',
      fileName: 'index',
    },
    rollupOptions: { external: external(), output: { globals: { react: 'React' } } },
  },
  css: {
    modules: { localsConvention: 'camelCase' },
    postcss: { plugins: [postcssPresetEnv({ stage: 1 })] },
  },

  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, '.storybook'),
            // opcional: startScript: 'pnpm start:docs --quiet'
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
