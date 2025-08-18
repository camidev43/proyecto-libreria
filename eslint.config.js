// @ts-check
/**
 * ESLint 9 (flat config) para React + TypeScript + Vite + Vitest + Storybook
 */
import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import reactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  reactRecommended,
  reactJSXRuntime,
  // Desactiva reglas de estilo que chocarían con Prettier
  eslintConfigPrettier,

  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.linter.json',
      },
      globals: { ...globals.browser, ...globals.es2021 },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: { project: './tsconfig.json' } },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      'react-refresh': reactRefreshPlugin,
      'react-hooks': fixupPluginRules(reactHooksPlugin),
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          args: 'after-used',
        },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-cycle': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-const-assign': 'error',
    },
  },

  {
    files: ['**/*.{spec,test}.{js,jsx,ts,tsx}', '**/vitest.setup.ts'],
    languageOptions: {
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
      },
    },
  },

  { files: ['**/*.stories.*'], rules: { 'react-hooks/rules-of-hooks': 'off' } },

  {
    files: ['src/lib/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ group: ['**/environment/**'], message: 'No importes desde "environment" dentro de la lib.' }],
        },
      ],
    },
  },

  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [{ group: ['**/templates/**'], message: 'No importes templates directamente.' }],
        },
      ],
    },
  },

  { ignores: ['node_modules/**', 'dist/**', 'storybook-static/**', '**/*.snap', 'coverage/**'] },
];
