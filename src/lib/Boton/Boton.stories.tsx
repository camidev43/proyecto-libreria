import type { Meta, StoryObj } from '@storybook/react-vite';

import { Boton } from './Boton';

const meta = {
    title: 'Example/Boton',
    component: Boton,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as Meta<typeof Boton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: args => {
        return <Boton {...args} />;
    },
    args: {},
};

export const WithCode: Story = {
    render: args => {
        // here comes the code
        return <Boton {...args} />;
    },
};

WithCode.args = {};

WithCode.argTypes = {};

WithCode.parameters = {
    docs: {
        source: {
            language: 'tsx',
            type: 'code',
        },
    },
};
