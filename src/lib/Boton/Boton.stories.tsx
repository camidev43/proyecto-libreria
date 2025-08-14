/// <reference lib="dom" />
import type { Meta, StoryObj } from '@storybook/react';

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
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
                category: 'Layout',
            },
        },
        radius: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'full'],
            description: 'Radio del border-radius para esquinas redondeadas',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'md' },
                category: 'Layout',
            },
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
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Content',
            },
        },
        endContent: {
            control: 'text',
            description: 'Contenido (icono/texto) que aparece al final del botón',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Content',
            },
        },
        children: {
            control: 'text',
            description: 'Contenido principal del botón (texto, elementos)',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Content',
            },
        },
        onClick: {
            action: 'clicked',
            description: 'Función que se ejecuta al hacer click en el botón',
            table: {
                type: { summary: '(event: MouseEvent) => void' },
                category: 'Events',
            },
        },
    },
} as Meta<typeof Boton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Historia principal para playground
export const Playground: Story = {
    args: {
        children: 'Button',
        variant: 'solid',
        color: 'primary',
        size: 'md',
        radius: 'md',
    },
};

// Todas las variantes
export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: 'var(--color-primary-text)' }}>Todas las Variantes</h3>

            {/* Primary */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Primary</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton variant='solid' color='primary'>
                        Solid
                    </Boton>
                    <Boton variant='bordered' color='primary'>
                        Bordered
                    </Boton>
                    <Boton variant='light' color='primary'>
                        Light
                    </Boton>
                    <Boton variant='faded' color='primary'>
                        Faded
                    </Boton>
                    <Boton variant='ghost' color='primary'>
                        Ghost
                    </Boton>
                    <Boton variant='shadow' color='primary'>
                        Shadow
                    </Boton>
                </div>
            </div>

            {/* Secondary */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Secondary</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton variant='solid' color='secondary'>
                        Solid
                    </Boton>
                    <Boton variant='bordered' color='secondary'>
                        Bordered
                    </Boton>
                    <Boton variant='light' color='secondary'>
                        Light
                    </Boton>
                    <Boton variant='faded' color='secondary'>
                        Faded
                    </Boton>
                    <Boton variant='ghost' color='secondary'>
                        Ghost
                    </Boton>
                    <Boton variant='shadow' color='secondary'>
                        Shadow
                    </Boton>
                </div>
            </div>

            {/* Success */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Success</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton variant='solid' color='success'>
                        Solid
                    </Boton>
                    <Boton variant='bordered' color='success'>
                        Bordered
                    </Boton>
                    <Boton variant='light' color='success'>
                        Light
                    </Boton>
                    <Boton variant='faded' color='success'>
                        Faded
                    </Boton>
                    <Boton variant='ghost' color='success'>
                        Ghost
                    </Boton>
                    <Boton variant='shadow' color='success'>
                        Shadow
                    </Boton>
                </div>
            </div>

            {/* Warning */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Warning</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton variant='solid' color='warning'>
                        Solid
                    </Boton>
                    <Boton variant='bordered' color='warning'>
                        Bordered
                    </Boton>
                    <Boton variant='light' color='warning'>
                        Light
                    </Boton>
                    <Boton variant='faded' color='warning'>
                        Faded
                    </Boton>
                    <Boton variant='ghost' color='warning'>
                        Ghost
                    </Boton>
                    <Boton variant='shadow' color='warning'>
                        Shadow
                    </Boton>
                </div>
            </div>

            {/* Danger */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Danger</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton variant='solid' color='danger'>
                        Solid
                    </Boton>
                    <Boton variant='bordered' color='danger'>
                        Bordered
                    </Boton>
                    <Boton variant='light' color='danger'>
                        Light
                    </Boton>
                    <Boton variant='faded' color='danger'>
                        Faded
                    </Boton>
                    <Boton variant='ghost' color='danger'>
                        Ghost
                    </Boton>
                    <Boton variant='shadow' color='danger'>
                        Shadow
                    </Boton>
                </div>
            </div>

            {/* Default */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Default</h4>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton variant='solid' color='default'>
                        Solid
                    </Boton>
                    <Boton variant='bordered' color='default'>
                        Bordered
                    </Boton>
                    <Boton variant='light' color='default'>
                        Light
                    </Boton>
                    <Boton variant='faded' color='default'>
                        Faded
                    </Boton>
                    <Boton variant='ghost' color='default'>
                        Ghost
                    </Boton>
                    <Boton variant='shadow' color='default'>
                        Shadow
                    </Boton>
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            source: {
                code: `// Todas las combinaciones de variantes y colores
<Boton variant="solid" color="primary">Solid</Boton>
<Boton variant="bordered" color="primary">Bordered</Boton>
<Boton variant="light" color="primary">Light</Boton>
<Boton variant="faded" color="primary">Faded</Boton>
<Boton variant="ghost" color="primary">Ghost</Boton>
<Boton variant="shadow" color="primary">Shadow</Boton>`,
            },
        },
    },
};

// Tamaños
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
    parameters: {
        docs: {
            source: {
                code: `<Boton size="sm">Small</Boton>
<Boton size="md">Medium</Boton>
<Boton size="lg">Large</Boton>`,
            },
        },
    },
};

// Radios
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
    parameters: {
        docs: {
            source: {
                code: `<Boton radius="none">None</Boton>
<Boton radius="sm">Small</Boton>
<Boton radius="md">Medium</Boton>
<Boton radius="lg">Large</Boton>
<Boton radius="full">Full</Boton>`,
            },
        },
    },
};

// Estados
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
    parameters: {
        docs: {
            source: {
                code: `<Boton>Normal</Boton>
<Boton isLoading>Guardando</Boton>
<Boton isDisabled>Disabled</Boton>`,
            },
        },
    },
};

// Loading Examples
export const LoadingExamples: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: 'var(--color-primary-text)' }}>Ejemplos de Loading</h3>

            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Solo Spinner</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton color='primary' isLoading isIconOnly></Boton>
                    <Boton color='success' isLoading isIconOnly></Boton>
                    <Boton color='warning' isLoading isIconOnly></Boton>
                    <Boton color='danger' isLoading isIconOnly></Boton>
                </div>
            </div>

            {/* Con texto */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Con Texto</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton color='primary' isLoading>
                        Procesando...
                    </Boton>
                    <Boton color='success' isLoading>
                        Guardando
                    </Boton>
                    <Boton color='warning' isLoading>
                        Subiendo
                    </Boton>
                    <Boton color='danger' isLoading>
                        Eliminando
                    </Boton>
                </div>
            </div>

            {/* Diferentes variantes */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Diferentes Variantes</h4>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Boton variant='solid' color='primary' isLoading>
                        Solid
                    </Boton>
                    <Boton variant='bordered' color='primary' isLoading>
                        Bordered
                    </Boton>
                    <Boton variant='light' color='primary' isLoading>
                        Light
                    </Boton>
                    <Boton variant='faded' color='primary' isLoading>
                        Faded
                    </Boton>
                    <Boton variant='ghost' color='primary' isLoading>
                        Ghost
                    </Boton>
                    <Boton variant='shadow' color='primary' isLoading>
                        Shadow
                    </Boton>
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: `
### Ejemplos de Loading

El sistema de loading incluye un spinner moderno con animación de pulso. El spinner se adapta al color del botón y puede usarse solo o con texto.

**Características:**
- Spinner moderno con animación de múltiples puntos
- Mantiene el texto visible con opacidad reducida
- Se adapta automáticamente al color del botón
- Funciona en todas las variantes y tamaños
                `,
            },
            source: {
                code: `// Solo spinner
<Boton color="primary" isLoading isIconOnly></Boton>

// Con texto
<Boton color="primary" isLoading>Procesando...</Boton>

// Diferentes variantes
<Boton variant="bordered" color="primary" isLoading>Cargando</Boton>`,
            },
        },
    },
};

// Con contenido
export const WithContent: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
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
    parameters: {
        docs: {
            source: {
                code: `<Boton startContent="🚀">Start Icon</Boton>
<Boton endContent="✨">End Icon</Boton>
<Boton startContent="🚀" endContent="✨">Both Icons</Boton>`,
            },
        },
    },
};

// Solo iconos
export const IconOnly: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
            <Boton color='primary' isIconOnly>
                🎯
            </Boton>
            <Boton color='secondary' isIconOnly>
                ❤️
            </Boton>
            <Boton color='success' isIconOnly>
                ✅
            </Boton>
            <Boton color='warning' isIconOnly>
                ⚠️
            </Boton>
            <Boton color='danger' isIconOnly>
                ❌
            </Boton>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Boton color="primary" isIconOnly>🎯</Boton>
<Boton color="secondary" isIconOnly>❤️</Boton>
<Boton color="success" isIconOnly>✅</Boton>`,
            },
        },
    },
};

// Ancho completo
export const FullWidth: Story = {
    render: () => (
        <div style={{ width: '300px', margin: '0 auto' }}>
            <Boton color='primary' fullWidth>
                Full Width Button
            </Boton>
        </div>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Boton fullWidth>Full Width Button</Boton>`,
            },
        },
    },
};

// Casos de uso comunes
export const CommonUseCases: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center', padding: '2rem' }}>
            {/* Acciones de Formulario */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Acciones de Formulario</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='primary'>Guardar</Boton>
                    <Boton color='success'>Enviar</Boton>
                    <Boton variant='bordered' color='default'>
                        Cancelar
                    </Boton>
                    <Boton variant='light' color='default'>
                        Restablecer
                    </Boton>
                    <Boton color='primary' isLoading>
                        Guardando...
                    </Boton>
                </div>
            </div>

            {/* Acciones Destructivas */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Acciones Destructivas</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='danger'>Eliminar</Boton>
                    <Boton variant='bordered' color='danger'>
                        Eliminar permanentemente
                    </Boton>
                    <Boton variant='ghost' color='danger'>
                        Descartar cambios
                    </Boton>
                    <Boton color='warning'>Archivar</Boton>
                    <Boton variant='light' color='danger'>
                        Limpiar datos
                    </Boton>
                </div>
            </div>

            {/* Navegación */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Navegación</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton variant='light' startContent='←'>
                        Anterior
                    </Boton>
                    <Boton variant='light' endContent='→'>
                        Siguiente
                    </Boton>
                    <Boton variant='bordered' startContent='↑'>
                        Subir
                    </Boton>
                    <Boton variant='bordered' endContent='🏠'>
                        Inicio
                    </Boton>
                    <Boton variant='ghost' startContent='⬅'>
                        Volver
                    </Boton>
                </div>
            </div>

            {/* Estados de Sistema */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Estados de Sistema</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='success' startContent='✓'>
                        Completado
                    </Boton>
                    <Boton color='warning' startContent='⚠'>
                        Advertencia
                    </Boton>
                    <Boton color='danger' startContent='✕'>
                        Error
                    </Boton>
                    <Boton color='primary' startContent='ℹ'>
                        Información
                    </Boton>
                    <Boton variant='faded' startContent='⏸'>
                        En pausa
                    </Boton>
                </div>
            </div>

            {/* Acciones de Archivo */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Gestión de Archivos</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton variant='bordered' startContent='📁'>
                        Abrir
                    </Boton>
                    <Boton color='primary' startContent='💾'>
                        Guardar
                    </Boton>
                    <Boton variant='light' startContent='📤'>
                        Exportar
                    </Boton>
                    <Boton variant='light' startContent='📥'>
                        Importar
                    </Boton>
                    <Boton variant='ghost' startContent='📋'>
                        Copiar
                    </Boton>
                    <Boton variant='shadow' startContent='🔗'>
                        Compartir
                    </Boton>
                </div>
            </div>

            {/* Multimedia */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Controles Multimedia</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='success' isIconOnly>
                        ▶
                    </Boton>
                    <Boton color='warning' isIconOnly>
                        ⏸
                    </Boton>
                    <Boton color='danger' isIconOnly>
                        ⏹
                    </Boton>
                    <Boton variant='bordered' isIconOnly>
                        ⏮
                    </Boton>
                    <Boton variant='bordered' isIconOnly>
                        ⏭
                    </Boton>
                    <Boton variant='light' isIconOnly>
                        🔊
                    </Boton>
                </div>
            </div>

            {/* E-commerce */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>E-commerce</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='primary' startContent='🛒'>
                        Agregar al carrito
                    </Boton>
                    <Boton color='success' startContent='💳'>
                        Comprar ahora
                    </Boton>
                    <Boton variant='bordered' startContent='❤'>
                        Favoritos
                    </Boton>
                    <Boton variant='light' startContent='👁'>
                        Vista rápida
                    </Boton>
                    <Boton variant='ghost' startContent='⚖'>
                        Comparar
                    </Boton>
                </div>
            </div>

            {/* Redes Sociales */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Redes Sociales</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='primary' startContent='👍'>
                        Me gusta
                    </Boton>
                    <Boton variant='bordered' startContent='💬'>
                        Comentar
                    </Boton>
                    <Boton variant='light' startContent='🔗'>
                        Compartir
                    </Boton>
                    <Boton color='secondary' startContent='➕'>
                        Seguir
                    </Boton>
                    <Boton variant='ghost' startContent='📨'>
                        Mensaje
                    </Boton>
                </div>
            </div>

            {/* Dashboard/Admin */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Dashboard/Admin</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='primary' startContent='➕'>
                        Crear nuevo
                    </Boton>
                    <Boton variant='bordered' startContent='✏'>
                        Editar
                    </Boton>
                    <Boton color='success' startContent='👁'>
                        Ver detalles
                    </Boton>
                    <Boton color='warning' startContent='⚙'>
                        Configurar
                    </Boton>
                    <Boton variant='light' startContent='📊'>
                        Reportes
                    </Boton>
                    <Boton variant='shadow' startContent='🔍'>
                        Buscar
                    </Boton>
                </div>
            </div>

            {/* Autenticación */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Autenticación</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='primary' fullWidth style={{ maxWidth: '200px' }}>
                        Iniciar sesión
                    </Boton>
                    <Boton variant='bordered' fullWidth style={{ maxWidth: '200px' }}>
                        Registrarse
                    </Boton>
                    <Boton variant='light' startContent='🔐'>
                        Olvidé mi contraseña
                    </Boton>
                    <Boton color='danger' startContent='🚪'>
                        Cerrar sesión
                    </Boton>
                </div>
            </div>

            {/* Comunicación */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Comunicación</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton color='primary' startContent='📧'>
                        Enviar email
                    </Boton>
                    <Boton color='success' startContent='📞'>
                        Llamar
                    </Boton>
                    <Boton variant='bordered' startContent='💬'>
                        Chat
                    </Boton>
                    <Boton variant='light' startContent='📱'>
                        SMS
                    </Boton>
                    <Boton variant='ghost' startContent='🔔'>
                        Notificar
                    </Boton>
                </div>
            </div>

            {/* Filtros y Búsqueda */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Filtros y Búsqueda</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton variant='faded' startContent='🔍'>
                        Buscar
                    </Boton>
                    <Boton variant='bordered' startContent='🔽'>
                        Filtrar
                    </Boton>
                    <Boton variant='light' startContent='↕'>
                        Ordenar
                    </Boton>
                    <Boton variant='ghost' startContent='✕'>
                        Limpiar filtros
                    </Boton>
                    <Boton color='primary' startContent='⚡'>
                        Búsqueda avanzada
                    </Boton>
                </div>
            </div>

            {/* Configuración */}
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary-text)' }}>Configuración</h4>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Boton variant='bordered' startContent='⚙'>
                        Configuración
                    </Boton>
                    <Boton variant='light' startContent='👤'>
                        Perfil
                    </Boton>
                    <Boton variant='ghost' startContent='🔐'>
                        Privacidad
                    </Boton>
                    <Boton color='warning' startContent='⚠'>
                        Seguridad
                    </Boton>
                    <Boton variant='faded' startContent='🎨'>
                        Tema
                    </Boton>
                    <Boton color='danger' startContent='🗑'>
                        Eliminar cuenta
                    </Boton>
                </div>
            </div>
        </div>
    ),
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: `
### Casos de Uso Comunes

Esta colección muestra implementaciones reales del sistema de botones en diferentes contextos de aplicación:

**Formularios**: Acciones estándar como guardar, enviar, cancelar con estados apropiados
**Destructivas**: Eliminación y acciones irreversibles con colores de advertencia
**Navegación**: Controles de movimiento y direccionamiento con iconos descriptivos
**Sistema**: Estados de aplicación con códigos de color semánticos
**Archivos**: Gestión de documentos con iconos representativos
**Multimedia**: Controles de reproducción estándar
**E-commerce**: Acciones de compra y interacción con productos
**Social**: Interacciones típicas de redes sociales
**Admin**: Panel de administración y gestión de contenido
**Auth**: Flujos de autenticación y seguridad
**Comunicación**: Herramientas de contacto y mensajería
**Filtros**: Búsqueda y organización de contenido
**Settings**: Configuración y personalización

Cada grupo demuestra cómo combinar variantes, colores e iconos para crear interfaces intuitivas.
                `,
            },
            source: {
                code: `// Ejemplos de casos de uso comunes

// Formularios
<Boton color="primary">Guardar</Boton>
<Boton color="success">Enviar</Boton>
<Boton variant="bordered" color="default">Cancelar</Boton>

// Destructivas
<Boton color="danger">Eliminar</Boton>
<Boton variant="bordered" color="danger">Eliminar permanentemente</Boton>

// Navegación
<Boton variant="light" startContent="←">Anterior</Boton>
<Boton variant="light" endContent="→">Siguiente</Boton>

// E-commerce
<Boton color="primary" startContent="🛒">Agregar al carrito</Boton>
<Boton color="success" startContent="💳">Comprar ahora</Boton>

// Multimedia
<Boton color="success" isIconOnly>▶</Boton>
<Boton color="warning" isIconOnly>⏸</Boton>

// Y muchos más casos...`,
            },
        },
    },
};
