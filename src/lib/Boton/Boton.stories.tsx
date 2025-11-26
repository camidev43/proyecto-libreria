/// <reference lib="dom" />
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import React from 'react';

import { Boton } from './Boton';

const meta = {
  title: 'Componentes/Boton',
  component: Boton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botón con 6 variantes, 6 colores, 3 tamaños, 5 radios y estados `loading` / `disabled`. ' +
          'Incluye matriz completa, ejemplos con iconos y guía de implementación.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'bordered', 'light', 'faded', 'ghost', 'shadow'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    isDisabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    isIconOnly: { control: 'boolean' },
    startContent: { control: false },
    endContent: { control: false },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Boton>;

export default meta;
type Story = StoryObj<typeof meta>;

const Flex = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    {children}
  </div>
);

export const BotonStory: Story = {
  name: 'Botón',
  args: { children: 'Botón', variant: 'solid', color: 'primary', size: 'md', radius: 'md' },
  parameters: {
    docs: { description: { story: 'Ejemplo base del componente.' } },
  },
};

export const Interactivo: Story = {
  name: 'Acción onClick',
  args: { children: 'Haz click', color: 'primary', onClick: () => {} },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const btn = c.getByRole('button', { name: /haz click/i });
    await expect(btn).toBeEnabled();
    await userEvent.click(btn);
  },
  parameters: {
    docs: { disable: true },
  },
};

export const IconOnly: Story = {
  render: () => (
    <Flex>
      <Boton isIconOnly variant='bordered' color='primary' aria-label='Buscar'>
        🔍
      </Boton>
      <Boton isIconOnly variant='bordered' color='danger' aria-label='Eliminar'>
        🗑️
      </Boton>
      <Boton isIconOnly variant='bordered' color='success' aria-label='Guardar'>
        💾
      </Boton>
    </Flex>
  ),
  parameters: { docs: { description: { story: 'Solo-icono con variante **bordered**.' } } },
};

export const Sizes: Story = {
  render: () => (
    <Flex>
      <Boton size='sm' color='primary'>
        Pequeño
      </Boton>
      <Boton size='md' color='primary'>
        Mediano
      </Boton>
      <Boton size='lg' color='primary'>
        Grande
      </Boton>
    </Flex>
  ),
  parameters: { docs: { description: { story: 'Comparativa `sm`, `md`, `lg`.' } } },
};
export const Radios: Story = {
  render: () => (
    <Flex>
      <Boton radius='none' color='primary'>
        None
      </Boton>
      <Boton radius='sm' color='primary'>
        Sm
      </Boton>
      <Boton radius='md' color='primary'>
        Md
      </Boton>
      <Boton radius='lg' color='primary'>
        Lg
      </Boton>
      <Boton radius='full' color='primary'>
        Full
      </Boton>
    </Flex>
  ),
  parameters: { docs: { description: { story: 'Diferentes radios de borde.' } } },
};

export const ConIconos: Story = {
  render: () => (
    <Flex>
      <Boton startContent='🚀' color='primary'>
        Inicio
      </Boton>
      <Boton endContent='➡️' color='primary'>
        Fin
      </Boton>
      <Boton startContent='🚀' endContent='✨' color='primary'>
        Ambos
      </Boton>
    </Flex>
  ),
  parameters: { docs: { description: { story: '`startContent` y `endContent`.' } } },
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '320px', margin: '1rem auto' }}>
      <Boton fullWidth color='primary'>
        Ancho completo
      </Boton>
    </div>
  ),
  parameters: { docs: { description: { story: 'Propiedad `fullWidth`.' } } },
};

export const estados: Story = {
  render: () => (
    <Flex>
      <Boton isDisabled color='primary'>
        Disabled
      </Boton>
      <Boton isLoading color='primary'>
        Loading
      </Boton>
      <Boton isDisabled variant='bordered' color='default'>
        Disabled
      </Boton>
      <Boton isLoading variant='bordered' color='default'>
        Loading
      </Boton>
    </Flex>
  ),
  parameters: {
    docs: { description: { story: 'Estados `isDisabled` y `isLoading` en diferentes variantes.' } },
  },
};
export const matrizVariantes: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-secondary-text)' }}>
        Matriz Completa de variantes y colores
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(6, minmax(120px,max-content))',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div></div>
        {['Default', 'Primary', 'Secondary', 'Success', 'Warning', 'Danger'].map(h => (
          <div key={h} style={{ fontWeight: 'bold', textAlign: 'center', padding: '.5rem' }}>
            {h}
          </div>
        ))}

        {(['solid', 'bordered', 'light', 'faded', 'ghost', 'shadow'] as const).map(variant => (
          <React.Fragment key={variant}>
            <div style={{ fontWeight: 'bold', padding: '.5rem' }}>{variant[0].toUpperCase() + variant.slice(1)}</div>
            {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map(color => (
              <Boton key={`${variant}-${color}`} variant={variant} color={color} size='md'>
                Botón
              </Boton>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '36 combinaciones: 6 variantes × 6 colores. Útil para pruebas visuales y referencia.',
      },
    },
  },
};

export const BotonCustomizado: Story = {
  render: () => (
    <Flex>
      <Boton
        style={{
          background: 'linear-gradient(90deg, #ff8a00 0%, #e52e71 100%)',
          color: '#fff',
          borderRadius: '2rem',
          boxShadow: '0 4px 16px rgba(229,46,113,0.15)',
          fontWeight: 700,
          fontSize: '1.1rem',
          padding: '0.75rem 2.5rem',
          letterSpacing: '0.05em',
          border: 'none',
        }}>
        🚀 Botón Súper Personalizado
      </Boton>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botón con gradiente, sombra, bordes redondeados y un emoji para destacar el estilo personalizado.',
      },
    },
  },
};
