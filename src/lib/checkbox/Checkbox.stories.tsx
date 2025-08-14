import type { Meta, StoryObj } from '@storybook/react-vite';

import CheckboxGroup from './CheckboxGroup';
import CheckboxGroupCustom from './CheckboxGroupCustom';
import type { Option } from './types';

const opciones: Option[] = [
    { value: 'uno', label: 'Uno', descripcion: 'Primera opción' },
    { value: 'dos', label: 'Dos', descripcion: 'Segunda opción' },
    { value: 'tres', label: 'Tres', descripcion: 'Tercera opción' },
];

const meta: Meta<typeof CheckboxGroup> = {
    title: 'Componentes/Checkbox',
    component: CheckboxGroup,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        Story => (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                <Story />
            </div>
        ),
    ],
    // tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Basico: Story = {
    args: {
        options: opciones,
        label: 'Elige opciones',
    },
};

export const Horizontal: Story = {
    args: {
        options: opciones,
        orientation: 'horizontal',
        label: 'Horizontal',
    },
};

export const Deshabilitado: Story = {
    args: {
        options: opciones,
        disabled: true,
        label: 'Deshabilitado',
    },
};

export const ConRelleno: Story = {
    args: {
        options: opciones,
        relleno: true,
        label: 'Con relleno',
    },
};

export const SinRelleno: Story = {
    args: {
        options: opciones,
        relleno: false,
        label: 'Sin relleno',
    },
};

export const ConColor: Story = {
    args: {
        options: opciones,
        color: '#e57373',
        label: 'Color personalizado',
    },
};

export const ConTachado: Story = {
    args: {
        options: opciones,
        tachado: true,
        label: 'Tachar al seleccionar',
    },
};

export const LimiteSeleccion: Story = {
    args: {
        options: opciones,
        maxSelecionados: 2,
        label: 'Máximo 2 seleccionados',
    },
};

export const Requerido: Story = {
    args: {
        options: opciones,
        required: true,
        label: 'Requerido',
    },
};

export const CustomRender: StoryObj = {
    render: () => (
        <CheckboxGroupCustom opciones={opciones} onChange={vals => console.log(vals)}>
            {(opcion, { checked, alternar, disabled }) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 30,
                        background: checked
                            ? 'color-mix(in srgb, var(--brand-primary, #4caf50) 8%, var(--background, #fff) 92%)'
                            : 'var(--background, #fff)',
                        border: checked
                            ? '2px solid var(--brand-primary, #4caf50)'
                            : '1px solid var(--surface-third, #bbb)',
                        borderRadius: 12,
                        padding: '14px 22px',
                        margin: '22px 0',
                        boxShadow: checked
                            ? '0 2px 8px 0 color-mix(in srgb, var(--brand-primary, #4caf50) 10%, transparent)'
                            : '0 1px 4px 0 color-mix(in srgb, var(--surface-third, #bbb) 10%, transparent)',
                        transition: 'all 0.2s',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        minWidth: 240,
                        backdropFilter: 'blur(1px)',
                    }}
                    onClick={() => !disabled && alternar()}>
                    <input
                        type='checkbox'
                        checked={checked}
                        onChange={alternar}
                        disabled={disabled}
                        style={{
                            accentColor: 'var(--brand-primary, #4caf50)',
                            width: 22,
                            height: 22,
                            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.07))',
                        }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                            style={{
                                fontWeight: 600,
                                fontSize: 17,
                                color: disabled ? 'var(--text-disabled, #aaa)' : 'var(--text-primary, #222)',
                                letterSpacing: 0.1,
                            }}>
                            {opcion.label}
                        </span>
                        {opcion.descripcion && (
                            <span
                                style={{
                                    fontSize: 13.5,
                                    color: 'var(--text-secondary, #666)',
                                    marginTop: 3,
                                }}>
                                {opcion.descripcion}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </CheckboxGroupCustom>
    ),
};
