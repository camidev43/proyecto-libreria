import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Componentes/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['flat', 'bordered', 'faded', 'underlined'] },
    color: { control: 'select', options: ['default', 'primary', 'danger', 'success'] },
    // Eliminado labelPlacement
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    label: 'Comentarios',
    placeholder: 'Escribe aquí...',
    variant: 'bordered',
  },
};

export const ValidacionError: Story = {
  args: {
    label: 'Con Error',
    defaultValue: 'Texto inválido',
    isInvalid: true,
    errorMessage: 'Este campo tiene un error crítico',
  },
};

export const Interaccion: Story = {
  args: {
    label: 'Prueba de Interacción',
    placeholder: 'Escribe "Hola"',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Prueba de Interacción');

    await userEvent.type(input, 'Hola Mundo');
    await expect(input).toHaveValue('Hola Mundo');
  },
};
