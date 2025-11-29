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
          'Incluye animación de ripple configurable, spinners personalizables y soporte completo para accesibilidad (WCAG).',
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
    onlyLoading: {
      control: 'boolean',
      description: 'Oculta el contenido y solo muestra el spinner cuando `isLoading` es true',
    },
    fullWidth: { control: 'boolean' },
    isIconOnly: { control: 'boolean' },
    disableRipple: { control: 'boolean' },
    disableAnimation: { control: 'boolean' },
    spinnerPlacement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Posición del spinner durante el estado loading',
    },
    startContent: { control: false },
    endContent: { control: false },
    spinner: { control: false },
    children: { control: 'text' },
    onClick: { action: 'clicked' },
    as: { control: false },
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
    }}
  >
    {children}
  </div>
);

export const BotonStory: Story = {
  name: 'Botón',
  args: { children: 'Botón', variant: 'solid', color: 'primary', size: 'md', radius: 'md' },
  parameters: {
    docs: { description: { story: 'Ejemplo base del componente con configuración por defecto.' } },
  },
};

export const Interactivo: Story = {
  name: 'Acción onClick',
  args: { children: 'Haz click', color: 'primary' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole('button', { name: /haz click/i });

    await expect(btn).toBeInTheDocument();
    await expect(btn).toBeEnabled();
    await expect(btn).not.toHaveClass('disabled');

    await userEvent.click(btn);
    await expect(args.onClick).toHaveBeenCalled();
  },
  parameters: {
    docs: {
      description: {
        story: 'Prueba de interacción con `play` function. Valida que el botón esté habilitado y responda al click.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => (
    <Flex>
      <Boton isIconOnly variant="solid" color="primary" aria-label="Buscar">
        🔍
      </Boton>
      <Boton isIconOnly variant="bordered" color="danger" aria-label="Eliminar">
        🗑️
      </Boton>
      <Boton isIconOnly variant="light" color="success" aria-label="Guardar">
        💾
      </Boton>
      <Boton isIconOnly variant="ghost" color="warning" aria-label="Editar">
        ✏️
      </Boton>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botones solo-icono en diferentes variantes. **Nota:** Siempre incluye `aria-label` para accesibilidad.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex>
      <Boton size="sm" color="primary">
        Pequeño
      </Boton>
      <Boton size="md" color="primary">
        Mediano
      </Boton>
      <Boton size="lg" color="primary">
        Grande
      </Boton>
    </Flex>
  ),
  parameters: { docs: { description: { story: 'Comparativa de tamaños: `sm` (32px), `md` (36px), `lg` (44px).' } } },
};

export const Radios: Story = {
  render: () => (
    <Flex>
      <Boton radius="none" color="primary">
        None
      </Boton>
      <Boton radius="sm" color="primary">
        Sm
      </Boton>
      <Boton radius="md" color="primary">
        Md
      </Boton>
      <Boton radius="lg" color="primary">
        Lg
      </Boton>
      <Boton radius="full" color="primary">
        Full
      </Boton>
    </Flex>
  ),
  parameters: { docs: { description: { story: 'Diferentes radios de borde disponibles.' } } },
};

export const ConIconos: Story = {
  render: () => (
    <Flex>
      <Boton startContent="🚀" color="primary">
        Inicio
      </Boton>
      <Boton endContent="➡️" color="primary">
        Fin
      </Boton>
      <Boton startContent="🚀" endContent="✨" color="primary">
        Ambos
      </Boton>
    </Flex>
  ),
  parameters: { docs: { description: { story: 'Uso de `startContent` y `endContent` para iconos.' } } },
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '320px', margin: '1rem auto' }}>
      <Boton fullWidth color="primary">
        Ancho completo
      </Boton>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Propiedad `fullWidth` para botones que ocupan el 100% del contenedor.' } },
  },
};

export const Estados: Story = {
  name: 'Estados: Disabled y Loading',
  render: () => (
    <Flex>
      <Boton isDisabled color="primary">
        Disabled
      </Boton>
      <Boton isLoading color="primary">
        Loading
      </Boton>
      <Boton isLoading spinnerPlacement="start" color="primary">
        Spinner Inicio
      </Boton>
      <Boton isDisabled variant="bordered" color="default">
        Disabled
      </Boton>
      <Boton isLoading variant="bordered" color="default">
        Loading
      </Boton>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Estados `isDisabled` y `isLoading`. El spinner puede colocarse al inicio con `spinnerPlacement="start"`.',
      },
    },
  },
};

export const LoadingOnlySpinner: Story = {
  name: 'Loading: Solo Spinner',
  render: () => (
    <Flex>
      <Boton isLoading onlyLoading color="primary" size="md">
        Texto Oculto
      </Boton>
      <Boton isLoading color="primary" size="md">
        Con Texto
      </Boton>
      <Boton isLoading onlyLoading variant="bordered" color="success">
        Texto Oculto
      </Boton>
      <Boton isIconOnly isLoading color="danger" aria-label="Procesando">
        💾
      </Boton>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Prop `onlyLoading` oculta el texto/iconos y solo muestra el spinner. Útil para botones con espacio limitado.',
      },
    },
  },
};

export const RippleAnimation: Story = {
  name: 'Animación de Ripple',
  render: () => (
    <Flex>
      <Boton color="primary">Con Ripple</Boton>
      <Boton disableRipple color="primary">
        Sin Ripple
      </Boton>
      <Boton disableAnimation color="secondary">
        Sin Animaciones
      </Boton>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Control de animaciones con `disableRipple` (solo ripple) y `disableAnimation` (todas las animaciones, incluyendo tap scale).',
      },
    },
  },
};

export const PolimorfismoAs: Story = {
  name: 'Polimorfismo: Prop "as"',
  render: () => (
    <Flex>
      <Boton as="a" href="https://github.com" target="_blank" color="primary">
        Link Externo
      </Boton>
      <Boton as="button" type="submit" color="success">
        Submit Button
      </Boton>
      <Boton as="a" href="#seccion" color="secondary">
        Anchor Interno
      </Boton>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'La prop `as` permite renderizar el botón como otros elementos HTML (`a`, `div`, etc.) manteniendo estilos y funcionalidad.',
      },
    },
  },
};

export const MatrizVariantes: Story = {
  name: 'Matriz Completa',
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-secondary-text)' }}>
        Matriz Completa de variantes y colores
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(6, minmax(120px, max-content))',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
              <Boton key={`${variant}-${color}`} variant={variant} color={color} size="md">
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
        story: '36 combinaciones: 6 variantes × 6 colores. Útil para pruebas visuales, QA y revisiones de diseño.',
      },
    },
  },
};

export const SpinnerPersonalizado: Story = {
  name: 'Spinner Personalizado',
  render: () => {
    const CustomSpinner = () => (
      <div
        style={{
          width: '1em',
          height: '1em',
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }}
      />
    );

    return (
      <Flex>
        <Boton isLoading color="primary">
          Spinner Default
        </Boton>
        <Boton isLoading spinner={<CustomSpinner />} color="success">
          Spinner Custom
        </Boton>
      </Flex>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Puedes reemplazar el spinner por defecto usando la prop `spinner` con cualquier componente React.',
      },
    },
  },
};
