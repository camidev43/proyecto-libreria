import type { Meta, StoryObj } from '@storybook/react';
import BadgeVoz from './BadgeVoz';

const meta: Meta<typeof BadgeVoz> = {
  title: 'Componentes/Voz/BadgeVoz',
  component: BadgeVoz,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BadgeVoz>;

export const Mic: Story = {
  args: {
    tipo: 'mic',
    texto: 'Escuchando...',
  },
};

export const Tts: Story = {
  args: {
    tipo: 'tts',
    texto: 'Leyendo...',
  },
};
