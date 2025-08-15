// @ts-check
/**
 * ESLint 9 (flat config) para React + TypeScript + Vite + Vitest + Storybook
 */
import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  reactRecommended,
  reactJSXRuntime,
  prettierRecommended,

  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        // Usa un TS config específico para lint (sin conflictos con el de build)
        project: './tsconfig.linter.json',
      },
      // ⬇️ Globals de navegador y ES modernos (localStorage, window, etc.)
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      'react-refresh': reactRefreshPlugin,
      'react-hooks': fixupPluginRules(reactHooksPlugin),
    },
    rules: {
      // TS + Hooks recomendadas
      ...tsPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

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

      // Import hygiene
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

      // Prettier como fuente de la verdad de estilo
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          jsxBracketSameLine: true,
          bracketSameLine: true,
          arrowParens: 'avoid',
          endOfLine: 'auto',
        },
      ],

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'no-const-assign': 'error',
    },
  },

  {
    files: ['**/*.{spec,test}.{js,jsx,ts,tsx}', '**/vitest.setup.ts'],
    languageOptions: {
      globals: {
        // Vitest globals (si los usas sin importar desde 'vitest')
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

  {
    files: ['**/*.stories.*'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },

  {
    files: ['src/lib/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/environment/**'],
              message:
                'No importes desde "environment" dentro de librería. Mantén la lib libre de dependencias de entorno.',
            },
          ],
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
          patterns: [
            {
              group: ['**/templates/**'],
              message: 'No importes templates directamente desde el código fuente.',
            },
          ],
        },
      ],
    },
  },

  {
    ignores: ['node_modules/**', 'dist/**', 'storybook-static/**', '**/*.snap', 'coverage/**'],
  },
];
