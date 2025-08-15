import type { Meta, StoryObj } from '@storybook/react';

import TextArea from './TextArea';

const meta = {
  title: 'Componentes/TextArea',
  component: TextArea,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: args => {
    return <TextArea {...args} />;
  },
  args: {},
};

export const WithCode: Story = {
  render: args => {
    // here comes the code
    return <TextArea {...args} />;
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
