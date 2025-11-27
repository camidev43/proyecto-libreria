import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import '../src/lib/styles/index.css';
import './preview.css';

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-theme',
    parentSelector: 'html',
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: { defaultViewport: 'responsive' },
    a11y: { test: 'warn' },
    docs: { autodocs: true },
  },
};

export default preview;
