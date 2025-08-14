/**
 * Theme objects para Docs (sin @storybook/theming).
 * Son objetos planos con valores HEX/strings para evitar errores del tipo
 * "Passed an incorrect argument to a color function".
 */

const common = {
    appBorderRadius: 8,
    inputBorderRadius: 8,
    brandTitle: 'PC Soluciones — Docs',
    brandUrl: 'https://example.com',
} as const;

export const lightTheme = {
    base: 'light',

    // Shell/UI
    appBg: '#ffffff',
    appContentBg: '#ffffff',
    appBorderColor: '#d0d7de',

    // Colores principales (usa HEX, no CSS vars)
    colorPrimary: '#2563eb',
    colorSecondary: '#2563eb',

    // Tipografía/UI
    textColor: '#22272e',
    textInverseColor: '#e6edf3',
    textMutedColor: '#57606a',

    // Top bar Docs/Preview
    barBg: '#f6f8fa',
    barTextColor: '#22272e',
    barSelectedColor: '#2563eb',

    // Inputs
    inputBg: '#ffffff',
    inputBorder: '#d0d7de',
    inputTextColor: '#22272e',

    ...common,
} as const;

export const darkTheme = {
    base: 'dark',

    // Shell/UI
    appBg: '#0f1115',
    appContentBg: '#14181d',
    appBorderColor: '#2b3138',

    // Colores principales
    colorPrimary: '#60a5fa',
    colorSecondary: '#60a5fa',

    // Tipografía/UI
    textColor: '#e6edf3',
    textInverseColor: '#0f1115',
    textMutedColor: '#9aa6b2',

    // Top bar
    barBg: '#1b2026',
    barTextColor: '#e6edf3',
    barSelectedColor: '#60a5fa',

    // Inputs
    inputBg: '#14181d',
    inputBorder: '#2b3138',
    inputTextColor: '#e6edf3',

    ...common,
} as const;
