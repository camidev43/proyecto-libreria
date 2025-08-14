// .storybook/preview.ts
import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import '../src/env/App/index.css';
import './preview.css';

export const decorators = [
    withThemeByDataAttribute({
        themes: { light: 'light', dark: 'dark' },
        defaultTheme: 'light',
        attributeName: 'data-theme', // canvas (tu app)
        parentSelector: 'html',
    }),
    withThemeByClassName({
        themes: { light: 'light', dark: 'dark' },
        defaultTheme: 'light',
        parentSelector: 'html', // Docs (usa html.light/.dark)
    }),
];

// (opcional) toolbar explícita para cambiar el tema
export const globalTypes = {
    theme: {
        name: 'Tema',
        defaultValue: 'light',
        toolbar: {
            icon: 'mirror',
            items: [
                { value: 'light', title: 'Claro' },
                { value: 'dark', title: 'Oscuro' },
            ],
            dynamicTitle: true,
        },
    },
};

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#14181d' },
            ],
        },
        viewport: { defaultViewport: 'responsive' },
        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo',
        },

        docs: { autodocs: true },
    },
};

export default preview;
