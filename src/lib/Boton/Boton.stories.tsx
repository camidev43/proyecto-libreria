/// <reference lib="dom" />
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from 'storybook/test';

import Boton from './Boton';

const meta = {
  title: 'Components/Boton',
  component: Boton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Sistema de Botones

Un sistema completo y moderno de botones con múltiples variantes, colores, tamaños y estados. Construido con CSS Modules y diseñado para ser altamente customizable y accesible.

## Características principales

- **6 Variantes**: solid, bordered, light, faded, ghost, shadow
- **6 Colores**: default, primary, secondary, success, warning, danger
- **3 Tamaños**: sm, md, lg
- **5 Radios**: none, sm, md, lg, full
- **Estados**: normal, loading, disabled
- **Contenido**: texto, iconos, combinaciones
- **Responsive**: fullWidth y adaptativo
- **Accesible**: ARIA labels y estados semánticos

## Casos de uso

Perfecto para interfaces modernas, dashboards, formularios, navegación y cualquier tipo de interacción que requiera botones elegantes y funcionales.

## Tecnologías

- React + TypeScript
- CSS Modules
- Modern CSS (light-dark, color-mix)
- Storybook para documentación
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'bordered', 'light', 'faded', 'ghost', 'shadow'],
      description: 'Variante visual del botón que define su apariencia base',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'solid' },
        category: 'Appearance',
      },
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color semántico del botón que define su propósito',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón que afecta padding y font-size',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' }, category: 'Layout' },
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Radio del border-radius para esquinas redondeadas',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' }, category: 'Layout' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Deshabilita el botón y previene interacciones',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Muestra un spinner y deshabilita el botón durante procesos async',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Hace que el botón ocupe todo el ancho disponible',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Layout',
      },
    },
    isIconOnly: {
      control: 'boolean',
      description: 'Optimiza el botón para mostrar solo un icono (aspect-ratio 1:1)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Layout',
      },
    },
    startContent: {
      control: 'text',
      description: 'Contenido (icono/texto) que aparece al inicio del botón',
      table: { type: { summary: 'React.ReactNode' }, category: 'Content' },
    },
    endContent: {
      control: 'text',
      description: 'Contenido (icono/texto) que aparece al final del botón',
      table: { type: { summary: 'React.ReactNode' }, category: 'Content' },
    },
    children: {
      control: 'text',
      description: 'Contenido principal del botón (texto, elementos)',
      table: { type: { summary: 'React.ReactNode' }, category: 'Content' },
    },
    onClick: {
      action: 'clicked',
      description: 'Función que se ejecuta al hacer click en el botón',
      table: { type: { summary: '(event: MouseEvent) => void' }, category: 'Events' },
    },
  },
} satisfies Meta<typeof Boton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    radius: 'md',
    onClick: () => {},
  },
};

export const Interactivo: Story = {
  name: 'Interactivo (play)',
  args: { children: 'Haz click', color: 'primary' },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const btn = c.getByRole('button', { name: /haz click/i });
    await expect(btn).toBeEnabled();
    await userEvent.click(btn); // verás el evento en Actions si pasas onClick
  },
};

/** Estado Disabled: ahora sí pasa toBeDisabled() porque usas el atributo HTML */
export const Disabled: Story = {
  args: { children: 'No disponible', isDisabled: true },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const btn = c.getByRole('button', { name: /no disponible/i });
    await expect(btn).toBeDisabled();
  },
};

/** Estado Loading: normalmente también deshabilitas; además expones aria-busy */
export const Loading: Story = {
  args: { children: 'Cargando', isLoading: true },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const btn = c.getByRole('button', { name: /cargando/i });
    await expect(btn).toBeDisabled();
    await expect(btn).toHaveAttribute('aria-busy', 'true');
  },
};

/** Icon-only accesible: imprescindible aria-label */
export const IconOnlyA11y: Story = {
  name: 'Icon-only accesible',
  args: { isIconOnly: true, children: '🔍', 'aria-label': 'Buscar' },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    c.getByRole('button', { name: /buscar/i });
  },
};

export const Accesible: Story = {
  name: 'Accesible (aria-label e icon-only)',
  args: {
    isIconOnly: true,
    children: '🔍',
    color: 'primary',
    'aria-label': 'Buscar',
  },
  parameters: {
    a11y: {},
    docs: {
      description: {
        story:
          'Cuando el botón es solo icono, proporciona `aria-label` para exponer un nombre accesible (por ejemplo, “Buscar”).',
      },
    },
  },
};

/** Variantes/colores (render) */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <h3 style={{ margin: 0, color: 'var(--color-primary-text)' }}>Todas las Variantes</h3>

      {(['primary', 'secondary', 'success', 'warning', 'danger', 'default'] as const).map(color => (
        <div key={color} style={{ textAlign: 'center' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>
            {color[0].toUpperCase() + color.slice(1)}
          </h4>
          <div
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Boton variant='solid' color={color}>
              Solid
            </Boton>
            <Boton variant='bordered' color={color}>
              Bordered
            </Boton>
            <Boton variant='light' color={color}>
              Light
            </Boton>
            <Boton variant='faded' color={color}>
              Faded
            </Boton>
            <Boton variant='ghost' color={color}>
              Ghost
            </Boton>
            <Boton variant='shadow' color={color}>
              Shadow
            </Boton>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

/** Tamaños */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
      <Boton size='sm' color='primary'>
        Small
      </Boton>
      <Boton size='md' color='primary'>
        Medium
      </Boton>
      <Boton size='lg' color='primary'>
        Large
      </Boton>
    </div>
  ),
};

/** Radios */
export const Radius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
      <Boton radius='none' color='primary'>
        None
      </Boton>
      <Boton radius='sm' color='primary'>
        Small
      </Boton>
      <Boton radius='md' color='primary'>
        Medium
      </Boton>
      <Boton radius='lg' color='primary'>
        Large
      </Boton>
      <Boton radius='full' color='primary'>
        Full
      </Boton>
    </div>
  ),
};

/** Estados */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
      <Boton color='primary'>Normal</Boton>
      <Boton color='primary' isLoading>
        Guardando
      </Boton>
      <Boton color='primary' isDisabled>
        Disabled
      </Boton>
    </div>
  ),
};

/** Con contenido (iconos) */
export const WithContent: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
      <Boton color='primary' startContent='🚀'>
        Start Icon
      </Boton>
      <Boton color='primary' endContent='✨'>
        End Icon
      </Boton>
      <Boton color='primary' startContent='🚀' endContent='✨'>
        Both Icons
      </Boton>
    </div>
  ),
};

/** Solo icono */
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
      <Boton color='primary' isIconOnly aria-label='Objetivo'>
        🎯
      </Boton>
      <Boton color='secondary' isIconOnly aria-label='Me gusta'>
        ❤️
      </Boton>
      <Boton color='success' isIconOnly aria-label='Confirmar'>
        ✅
      </Boton>
      <Boton color='warning' isIconOnly aria-label='Advertencia'>
        ⚠️
      </Boton>
      <Boton color='danger' isIconOnly aria-label='Cerrar'>
        ❌
      </Boton>
    </div>
  ),
};

/** Full width */
export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Boton color='primary' fullWidth>
        Full Width Button
      </Boton>
    </div>
  ),
};
