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

  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#d0d7de',

  colorPrimary: '#2563eb',
  colorSecondary: '#2563eb',

  textColor: '#22272e',
  textInverseColor: '#e6edf3',
  textMutedColor: '#57606a',

  barBg: '#f6f8fa',
  barTextColor: '#22272e',
  barSelectedColor: '#2563eb',

  inputBg: '#ffffff',
  inputBorder: '#d0d7de',
  inputTextColor: '#22272e',

  ...common,
} as const;

export const darkTheme = {
  base: 'dark',

  appBg: '#0f1115',
  appContentBg: '#14181d',
  appBorderColor: '#2b3138',

  colorPrimary: '#60a5fa',
  colorSecondary: '#60a5fa',

  textColor: '#e6edf3',
  textInverseColor: '#0f1115',
  textMutedColor: '#9aa6b2',

  barBg: '#1b2026',
  barTextColor: '#e6edf3',
  barSelectedColor: '#60a5fa',

  inputBg: '#14181d',
  inputBorder: '#2b3138',
  inputTextColor: '#e6edf3',

  ...common,
} as const;
