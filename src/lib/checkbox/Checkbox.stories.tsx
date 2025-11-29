import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta: Meta<typeof Checkbox> = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    children: 'Checked checkbox',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled checkbox',
    isDisabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: 'Disabled checked',
    isDisabled: true,
    defaultChecked: true,
  },
};

export const ReadOnly: Story = {
  args: {
    children: 'Read only checkbox',
    isReadOnly: true,
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    children: 'Indeterminate state',
    isIndeterminate: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Checkbox size="sm" defaultChecked>
        Small checkbox
      </Checkbox>
      <Checkbox size="md" defaultChecked>
        Medium checkbox
      </Checkbox>
      <Checkbox size="lg" defaultChecked>
        Large checkbox
      </Checkbox>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Checkbox color="primary" defaultChecked>
        Primary
      </Checkbox>
      <Checkbox color="secondary" defaultChecked>
        Secondary
      </Checkbox>
      <Checkbox color="success" defaultChecked>
        Success
      </Checkbox>
      <Checkbox color="warning" defaultChecked>
        Warning
      </Checkbox>
      <Checkbox color="danger" defaultChecked>
        Danger
      </Checkbox>
    </div>
  ),
};

export const RadiusVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Checkbox radius="none" defaultChecked>
        No radius
      </Checkbox>
      <Checkbox radius="sm" defaultChecked>
        Small radius
      </Checkbox>
      <Checkbox radius="md" defaultChecked>
        Medium radius
      </Checkbox>
      <Checkbox radius="lg" defaultChecked>
        Large radius
      </Checkbox>
      <Checkbox radius="full" defaultChecked>
        Full radius
      </Checkbox>
    </div>
  ),
};

export const LineThrough: Story = {
  args: {
    children: 'Task completed',
    lineThrough: true,
    defaultChecked: true,
  },
};

export const OnlyIcon: Story = {
  args: {
    onlyIcon: true,
    defaultChecked: true,
  },
};

export const DisableAnimation: Story = {
  args: {
    children: 'No animation',
    disableAnimation: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    defaultChecked: true,
  },
};

export const VerticalGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <CheckboxGroup
        label="Vertical Group (Radius LG)"
        description="Select your preferred options"
        orientation="vertical"
        value={selected}
        onChange={setSelected}
      >
        <Checkbox value="option1" radius="lg">
          Option 1
        </Checkbox>
        <Checkbox value="option2" radius="lg">
          Option 2
        </Checkbox>
        <Checkbox value="option3" radius="lg">
          Option 3
        </Checkbox>
      </CheckboxGroup>
    );
  },
};

export const HorizontalGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <CheckboxGroup
        label="Horizontal Group (Primary)"
        orientation="horizontal"
        value={selected}
        onChange={setSelected}
      >
        <Checkbox value="h1">H1</Checkbox>
        <Checkbox value="h2">H2</Checkbox>
        <Checkbox value="h3">H3</Checkbox>
      </CheckboxGroup>
    );
  },
};

export const GroupWithError: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <CheckboxGroup
        label="Terms acceptance"
        isInvalid={selected.length === 0}
        errorMessage="You must accept the terms and conditions"
        orientation="vertical"
        value={selected}
        onChange={setSelected}
      >
        <Checkbox value="terms">I accept terms and conditions</Checkbox>
        <Checkbox value="privacy">I accept privacy policy</Checkbox>
      </CheckboxGroup>
    );
  },
};

export const DisabledGroup: Story = {
  render: () => (
    <CheckboxGroup label="Disabled Group" isDisabled orientation="vertical">
      <Checkbox value="opt1">Option 1</Checkbox>
      <Checkbox value="opt2">Option 2</Checkbox>
      <Checkbox value="opt3">Option 3</Checkbox>
    </CheckboxGroup>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary-text)' }}>Basic States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Checkbox>Unchecked</Checkbox>
          <Checkbox defaultChecked>Checked</Checkbox>
          <Checkbox isDisabled>Disabled Unchecked</Checkbox>
          <Checkbox isDisabled defaultChecked>
            Disabled Checked
          </Checkbox>
          <Checkbox isReadOnly defaultChecked>
            Read Only (Checked)
          </Checkbox>
          <Checkbox isIndeterminate>Indeterminate</Checkbox>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary-text)' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Checkbox size="sm" defaultChecked>
            Small
          </Checkbox>
          <Checkbox size="md" defaultChecked>
            Medium
          </Checkbox>
          <Checkbox size="lg" defaultChecked>
            Large
          </Checkbox>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary-text)' }}>Colors</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Checkbox color="primary" defaultChecked>
            Primary
          </Checkbox>
          <Checkbox color="secondary" defaultChecked>
            Secondary
          </Checkbox>
          <Checkbox color="success" defaultChecked>
            Success
          </Checkbox>
          <Checkbox color="warning" defaultChecked>
            Warning
          </Checkbox>
          <Checkbox color="danger" defaultChecked>
            Danger
          </Checkbox>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary-text)' }}>Radius</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Checkbox radius="none" defaultChecked>
            None
          </Checkbox>
          <Checkbox radius="sm" defaultChecked>
            Small
          </Checkbox>
          <Checkbox radius="md" defaultChecked>
            Medium
          </Checkbox>
          <Checkbox radius="lg" defaultChecked>
            Large
          </Checkbox>
          <Checkbox radius="full" defaultChecked>
            Full
          </Checkbox>
        </div>
      </div>
    </div>
  ),
};
