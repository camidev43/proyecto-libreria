// @ts-check

/**
 * Configuración de ESLint para proyecto React + TypeScript
 *
 * Esta configuración está optimizada para:
 * - React 19 con TypeScript 5.8
 * - ESLint 9 (flat config)
 * - Vite como bundler
 * - Jest para testing
 * - Storybook para documentación
 * - Prettier para formateo
 */

import eslint from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import configReactRecommended from 'eslint-plugin-react/configs/recommended.js';
import configReactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat';
import configPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    // Configuraciones base recomendadas
    eslint.configs.recommended, // Reglas básicas de JavaScript
    configReactRecommended, // Reglas recomendadas para React
    configReactJSXRuntime, // Soporte para nuevo JSX Transform (React 17+)
    configPrettierRecommended, // Integración con Prettier

    // === CONFIGURACIÓN PRINCIPAL PARA ARCHIVOS TYPESCRIPT Y REACT ===
    {
        files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
        linterOptions: {
            // Reportar directivas de ESLint disable que no están siendo usadas
            reportUnusedDisableDirectives: 'error',
        },
        languageOptions: {
            // Parser específico para TypeScript
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: { jsx: true }, // Habilitar JSX
                ecmaVersion: 'latest', // Usar última versión de ECMAScript
                sourceType: 'module', // Usar módulos ES6
                project: './tsconfig.linter.json', // Archivo TypeScript config para linting
            },
            // Variables globales disponibles en el entorno del navegador
            globals: {
                console: 'readonly',
                document: 'readonly',
                window: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
            },
        },
        settings: {
            react: {
                version: 'detect', // Auto-detectar versión de React
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
            import: pluginImport,
            prettier: pluginPrettier,
            'react-refresh': pluginReactRefresh,
            'react-hooks': fixupPluginRules(pluginReactHooks), // Usar fixup para compatibilidad ESLint 9
        },
        rules: {
            // Aplicar reglas recomendadas de TypeScript y React Hooks
            ...typescriptEslint.configs.recommended.rules,
            ...pluginReactHooks.configs.recommended.rules,

            /**
             * Permitir funciones de flecha vacías `() => {}`, mientras restringe otras funciones vacías
             * @see https://eslint.org/docs/latest/rules/no-empty-function#allow-arrowfunctions
             */
            '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],

            /**
             * Permitir comentarios de TypeScript (@ts-ignore, etc.) con advertencia
             */
            '@typescript-eslint/ban-ts-comment': 1,

            /**
             * Evitar reasignación de variables const
             */
            'no-const-assign': 'error',

            /**
             * Enforza el orden de imports con líneas vacías entre grupos de imports
             * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
             */
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    pathGroups: [
                        {
                            pattern: '@/**', // Alias internos del proyecto
                            group: 'internal',
                        },
                    ],
                    'newlines-between': 'always', // Líneas vacías entre grupos
                },
            ],

            /**
             * Deshabilitar imports combinados de módulos y tipos como `import React, {FC} from 'react'`
             * ESLint intentará dividir en imports de tipo y módulo por separado
             * @see https://typescript-eslint.io/rules/consistent-type-imports/
             */
            '@typescript-eslint/consistent-type-imports': 'error',

            /**
             * Evitar imports circulares entre módulos
             */
            /**
             * Evitar imports circulares entre módulos
             */
            'import/no-cycle': 'error',

            /**
             * Configuración de Prettier integrada con ESLint
             */
            'prettier/prettier': [
                'error',
                {
                    semi: true, // Usar punto y coma
                    singleQuote: true, // Usar comillas simples
                    jsxSingleQuote: true, // Usar comillas simples en JSX
                    trailingComma: 'es5', // Comas finales compatibles con ES5
                    bracketSpacing: true, // Espacios en llaves de objetos
                    jsxBracketSameLine: true, // Cerrar > de JSX en la misma línea
                    arrowParens: 'avoid', // Evitar paréntesis en arrow functions de un parámetro
                    endOfLine: 'auto', // Terminación de línea automática (cross-platform)
                },
            ],

            /**
             * Requerido por Vite para React Fast Refresh
             * Advertir sobre componentes que no son exportaciones por defecto
             */
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            /**
             * Enforza el uso de 'type' en lugar de 'interface' para consistencia
             */
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

            /**
             * Permitir variables no usadas que empiecen con '_'
             * Útil para parámetros de funciones que no se usan pero son requeridos por la firma
             * @see https://eslint.org/docs/latest/rules/no-unused-vars
             * @see https://typescript-eslint.io/rules/no-unused-vars/
             */
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_', // Ignorar argumentos que empiecen con _
                    varsIgnorePattern: '^_', // Ignorar variables que empiecen con _
                    caughtErrorsIgnorePattern: '^_', // Ignorar errores capturados que empiecen con _
                    ignoreRestSiblings: true, // Ignorar propiedades rest siblings
                    args: 'after-used', // Solo verificar argumentos después del último usado
                },
            ],
        },
    },

    // === CONFIGURACIÓN ESPECÍFICA PARA ARCHIVOS DE TEST Y CONFIGURACIÓN ===
    {
        files: [
            '**/*.spec.*', // Archivos de test (Jest)
            '**/testUtils/*.{js,jsx,ts,tsx}', // Utilidades de testing
            '*/*.{js,jsx,ts,tsx}', // Archivos de configuración en raíz
            '**/setupTests.ts', // Configuración de tests
            '**/*.stories.*', // Archivos de Storybook
            '*.config.{js,ts}', // Archivos de configuración
        ],
        languageOptions: {
            globals: {
                // Variables globales de Jest disponibles en archivos de test
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                jest: 'readonly',
            },
        },
    },

    // === RESTRICCIONES DE IMPORTS PARA ARCHIVOS DE LIBRERÍA ===
    {
        files: ['src/lib/**/*.{js,jsx,ts,tsx}'],
        rules: {
            /**
             * Prohibir imports desde el directorio 'environment' en archivos de librería
             * Los archivos de la librería no deben depender del entorno de desarrollo
             */
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/environment/**'],
                            message: 'Imports from environment directory are forbidden in the library files.',
                        },
                    ],
                },
            ],
        },
    },

    // === RESTRICCIONES GLOBALES DE IMPORTS ===
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        rules: {
            /**
             * Prohibir imports desde el directorio 'templates' en todos los archivos
             * Los templates son solo para generación de código, no para uso directo
             */
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/templates/**'],
                            message: 'Imports from templates directory are forbidden.',
                        },
                    ],
                },
            ],
        },
    },

    // === CONFIGURACIÓN ESPECÍFICA PARA ARCHIVOS DE STORYBOOK ===
    {
        files: ['**/*.stories.*'],
        rules: {
            /**
             * Deshabilitar reglas de hooks en archivos de stories
             * Permite mejor visualización del código en Storybook
             * @see TemplateName.stories.tsx
             */
            'react-hooks/rules-of-hooks': 'off',
        },
    },

    // === ARCHIVOS Y DIRECTORIOS IGNORADOS ===
    {
        ignores: [
            '**/*.snap', // Archivos snapshot de Jest
            'dist/**', // Directorio de build
            'storybook-static/**', // Build estático de Storybook
        ],
    },
];
