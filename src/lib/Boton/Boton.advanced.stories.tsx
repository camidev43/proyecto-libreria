/// <reference lib="dom" />
import type { Meta, StoryObj } from '@storybook/react';

import Boton from './Boton';

const meta = {
  title: 'Components/Boton/Advanced',
  component: Boton,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Boton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Matrix completa de variantes
export const VariantMatrix: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h3
        style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-secondary-text)' }}>
        Matriz Completa de Variantes y Colores
      </h3>

      {/* Tabla de variantes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(6, minmax(140px, max-content))',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '3rem',
        }}>
        {/* Headers */}
        <div style={{ fontWeight: 'bold', padding: '0.5rem', textAlign: 'center' }}></div>
        <div style={{ fontWeight: 'bold', padding: '0.5rem', textAlign: 'center' }}>Default</div>
        <div style={{ fontWeight: 'bold', padding: '0.5rem', textAlign: 'center' }}>Primary</div>
        <div style={{ fontWeight: 'bold', padding: '0.5rem', textAlign: 'center' }}>Secondary</div>
        <div style={{ fontWeight: 'bold', padding: '0.5rem', textAlign: 'center' }}>Success</div>
        <div style={{ fontWeight: 'bold', padding: '0.5rem', textAlign: 'center' }}>Warning</div>
        <div style={{ fontWeight: 'bold', padding: '0.5rem', textAlign: 'center' }}>Danger</div>

        {/* Solid */}
        <div style={{ fontWeight: 'bold', padding: '0.5rem' }}>Solid</div>
        <Boton color='default' size='md'>
          Botón
        </Boton>
        <Boton color='primary' size='md'>
          Botón
        </Boton>
        <Boton color='secondary' size='md'>
          Botón
        </Boton>
        <Boton color='success' size='md'>
          Botón
        </Boton>
        <Boton color='warning' size='md'>
          Botón
        </Boton>
        <Boton color='danger' size='md'>
          Botón
        </Boton>

        {/* Bordered */}
        <div style={{ fontWeight: 'bold', padding: '0.5rem' }}>Bordered</div>
        <Boton variant='bordered' color='default' size='md'>
          Botón
        </Boton>
        <Boton variant='bordered' color='primary' size='md'>
          Botón
        </Boton>
        <Boton variant='bordered' color='secondary' size='md'>
          Botón
        </Boton>
        <Boton variant='bordered' color='success' size='md'>
          Botón
        </Boton>
        <Boton variant='bordered' color='warning' size='md'>
          Botón
        </Boton>
        <Boton variant='bordered' color='danger' size='md'>
          Botón
        </Boton>

        {/* Light */}
        <div style={{ fontWeight: 'bold', padding: '0.5rem' }}>Light</div>
        <Boton variant='light' color='default' size='md'>
          Botón
        </Boton>
        <Boton variant='light' color='primary' size='md'>
          Botón
        </Boton>
        <Boton variant='light' color='secondary' size='md'>
          Botón
        </Boton>
        <Boton variant='light' color='success' size='md'>
          Botón
        </Boton>
        <Boton variant='light' color='warning' size='md'>
          Botón
        </Boton>
        <Boton variant='light' color='danger' size='md'>
          Botón
        </Boton>

        {/* Faded */}
        <div style={{ fontWeight: 'bold', padding: '0.5rem' }}>Faded</div>
        <Boton variant='faded' color='default' size='md'>
          Botón
        </Boton>
        <Boton variant='faded' color='primary' size='md'>
          Botón
        </Boton>
        <Boton variant='faded' color='secondary' size='md'>
          Botón
        </Boton>
        <Boton variant='faded' color='success' size='md'>
          Botón
        </Boton>
        <Boton variant='faded' color='warning' size='md'>
          Botón
        </Boton>
        <Boton variant='faded' color='danger' size='md'>
          Botón
        </Boton>

        {/* Ghost */}
        <div style={{ fontWeight: 'bold', padding: '0.5rem' }}>Ghost</div>
        <Boton variant='ghost' color='default' size='md'>
          Botón
        </Boton>
        <Boton variant='ghost' color='primary' size='md'>
          Botón
        </Boton>
        <Boton variant='ghost' color='secondary' size='md'>
          Botón
        </Boton>
        <Boton variant='ghost' color='success' size='md'>
          Botón
        </Boton>
        <Boton variant='ghost' color='warning' size='md'>
          Botón
        </Boton>
        <Boton variant='ghost' color='danger' size='md'>
          Botón
        </Boton>

        {/* Shadow */}
        <div style={{ fontWeight: 'bold', padding: '0.5rem' }}>Shadow</div>
        <Boton variant='shadow' color='default' size='md'>
          Botón
        </Boton>
        <Boton variant='shadow' color='primary' size='md'>
          Botón
        </Boton>
        <Boton variant='shadow' color='secondary' size='md'>
          Botón
        </Boton>
        <Boton variant='shadow' color='success' size='md'>
          Botón
        </Boton>
        <Boton variant='shadow' color='warning' size='md'>
          Botón
        </Boton>
        <Boton variant='shadow' color='danger' size='md'>
          Botón
        </Boton>
      </div>

      {/* Tamaños */}
      <h4
        style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--color-secondary-text)' }}>
        Tamaños Disponibles
      </h4>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '3rem',
        }}>
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

      {/* Estados especiales */}
      <h4
        style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--color-secondary-text)' }}>
        Estados Especiales
      </h4>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem',
        }}>
        <Boton color='primary'>Normal</Boton>
        <Boton color='primary' isDisabled>
          Deshabilitado
        </Boton>
        <Boton color='primary' isLoading>
          Cargando
        </Boton>
        <Boton color='primary' isIconOnly>
          +
        </Boton>
        <Boton color='primary' fullWidth style={{ maxWidth: '200px' }}>
          Ancho completo
        </Boton>
      </div>

      {/* Con iconos */}
      <h4
        style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--color-secondary-text)' }}>
        Con Iconos
      </h4>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Boton startContent='⭐' color='primary'>
          Start Icon
        </Boton>
        <Boton endContent='→' color='secondary'>
          End Icon
        </Boton>
        <Boton startContent='💾' endContent='✓' color='success'>
          Ambos iconos
        </Boton>
        <Boton isIconOnly color='danger'>
          ❌
        </Boton>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
### Matriz Completa de Variantes

Esta vista comprehensiva muestra todas las combinaciones posibles del sistema de botones:

**36 Combinaciones**: 6 variantes × 6 colores = cobertura completa del sistema
**Tamaños**: sm, md, lg para diferentes jerarquías visuales
**Estados**: normal, disabled, loading, icon-only, full-width
**Iconografía**: start, end, both, icon-only para mayor expresividad

Perfecto para testing visual y como referencia de desarrollo.
            `,
      },
    },
  },
};

// Guía de implementación
export const ImplementationGuide: Story = {
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Guía de Implementación</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Básico */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>1. Uso Básico</h4>
          <div
            style={{
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}>
            <code>{`import { Boton } from '@/lib/Boton';

// Botón básico
<Boton>Click me</Boton>

// Con color
<Boton color="primary">Primary</Boton>

// Con variante
<Boton variant="bordered" color="danger">Delete</Boton>`}</code>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Boton>Click me</Boton>
            <Boton color='primary'>Primary</Boton>
            <Boton variant='bordered' color='danger'>
              Delete
            </Boton>
          </div>
        </div>

        {/* Iconos */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>2. Con Iconos</h4>
          <div
            style={{
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}>
            <code>{`// Icono al inicio
<Boton startContent="💾">Guardar</Boton>

// Icono al final
<Boton endContent="→">Siguiente</Boton>

// Solo icono
<Boton isIconOnly>+</Boton>`}</code>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Boton startContent='💾'>Guardar</Boton>
            <Boton endContent='→'>Siguiente</Boton>
            <Boton isIconOnly>+</Boton>
          </div>
        </div>

        {/* Estados */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>3. Estados</h4>
          <div
            style={{
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}>
            <code>{`// Deshabilitado
<Boton isDisabled>Disabled</Boton>

// Cargando
<Boton isLoading>Loading...</Boton>

// Ancho completo
<Boton fullWidth>Full Width</Boton>`}</code>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'flex-start',
            }}>
            <Boton isDisabled>Disabled</Boton>
            <Boton isLoading>Loading...</Boton>
            <Boton fullWidth style={{ maxWidth: '300px' }}>
              Full Width
            </Boton>
          </div>
        </div>

        {/* Eventos */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>4. Eventos</h4>
          <div
            style={{
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}>
            <code>{`// Evento click
<Boton onClick={() => alert('Clicked!')}>
  Click me
</Boton>

// Con TypeScript
const handleClick = (e: MouseEvent) => {
  console.log('Button clicked:', e);
};

<Boton onClick={handleClick}>
  TypeScript Click
</Boton>`}</code>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Boton onClick={() => alert('¡Botón presionado!')}>Click me</Boton>
          </div>
        </div>

        {/* Personalización */}
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>
            5. Personalización
          </h4>
          <div
            style={{
              backgroundColor: 'var(--color-background-secondary)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}>
            <code>{`// Clases CSS personalizadas
<Boton className="mi-clase-custom">
  Custom Style
</Boton>

// Estilos inline
<Boton style={{ borderRadius: '20px' }}>
  Custom Border
</Boton>

// Con ref
const buttonRef = useRef<HTMLButtonElement>(null);

<Boton ref={buttonRef}>
  With Ref
</Boton>`}</code>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Boton style={{ borderRadius: '20px' }}>Custom Border</Boton>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
### Guía Completa de Implementación

Tutorial paso a paso para integrar el componente Boton en tu aplicación:

**Importación**: Cómo importar y usar el componente básico
**Iconografía**: Diferentes formas de agregar iconos y content
**Estados**: Manejo de disabled, loading y full-width
**Eventos**: Integración con handlers y TypeScript
**Personalización**: Estilos custom, clases CSS y refs

Cada sección incluye código de ejemplo y una demostración visual.
            `,
      },
    },
  },
};
