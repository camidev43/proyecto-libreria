import { withoutVitePlugins } from '@storybook/builder-vite';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-themes', '@storybook/addon-vitest'],
    framework: { name: '@storybook/react-vite', options: {} },
    async viteFinal(cfg) {
        return { ...cfg, plugins: await withoutVitePlugins(cfg.plugins, ['vite:dts']) };
    },
    typescript: { reactDocgen: 'react-docgen-typescript' },
};
export default config;
