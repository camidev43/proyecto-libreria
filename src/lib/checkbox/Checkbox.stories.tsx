import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { userEvent, within, expect } from 'storybook/test';

import CheckboxGroup from './CheckboxGroup';
import CheckboxGroupCustom from './CheckboxGroupCustom';
import type { Option } from './types';

const opciones: Option[] = [
    { value: 'uno', label: 'Uno', descripcion: 'Primera opción' },
    { value: 'dos', label: 'Dos', descripcion: 'Segunda opción' },
    { value: 'tres', label: 'Tercera opción' },
];

const meta: Meta<typeof CheckboxGroup> = {
    title: 'Componentes/Checkbox',
    component: CheckboxGroup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'Componente para selección múltiple con soporte para orientación, estilos, límites y renderizado custom.',
            },
        },
    },
    decorators: [
        Story => (
            <div
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 320, width: 520 }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        options: {
            control: 'object',
            description: 'Lista de opciones',
            table: { type: { summary: 'Array<Option>' } },
        },
        value: {
            control: 'object',
            description: 'Lista de valores seleccionados (modo controlado)',
            table: { type: { summary: 'string[]' } },
        },
        onChange: {
            action: 'onChange',
            description: 'Se dispara con el array de seleccionados',
            table: { type: { summary: '(values: string[]) => void' } },
        },
        label: { control: 'text', description: 'Etiqueta del grupo' },
        orientation: {
            control: { type: 'radio' },
            options: ['vertical', 'horizontal'],
            description: 'Dirección de renderizado',
            table: { defaultValue: { summary: 'vertical' } },
        },
        disabled: { control: 'boolean', description: 'Deshabilita todo el grupo' },
        readOnly: { control: 'boolean', description: 'Solo lectura (bloquea cambios)' },
        required: { control: 'boolean', description: 'Marca el grupo como requerido' },
        relleno: { control: 'boolean', description: 'Usa checkbox con relleno (nativo) vs. SVG custom' },
        tachado: { control: 'boolean', description: 'Tacha el label cuando está seleccionado' },
        lineaMitad: { control: 'boolean', description: 'Dibuja separador entre opciones' },
        maxSelecionados: {
            control: { type: 'number', min: 1, step: 1 },
            description: 'Límite máximo de opciones seleccionadas',
            table: { type: { summary: 'number' } },
        },
        color: { control: 'color', description: 'Color principal (check/halo)' },
        borderColor: { control: 'color', description: 'Color del borde del checkbox' },
        size: {
            control: 'text',
            description: 'Tamaño del checkbox (e.g. 18px, 22px)',
            table: { type: { summary: 'CSSSize' } },
        },
        radius: {
            control: 'text',
            description: 'Radio del checkbox (e.g. 6px, var(--radius-2))',
            table: { type: { summary: 'CSSSize' } },
        },
        className: { control: false },
        classInterna: { control: false },
    },
    args: {
        options: opciones,
        orientation: 'vertical',
        relleno: true,
        label: 'Elige opciones',
    },
};
export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Basico: Story = {
    args: { options: opciones, label: 'Básico' },
};

export const Horizontal: Story = {
    args: { options: opciones, orientation: 'horizontal', label: 'Horizontal', lineaMitad: true },
};

export const Deshabilitado: Story = {
    args: { options: opciones, disabled: true, label: 'Deshabilitado' },
};

export const ConRelleno: Story = {
    args: { options: opciones, relleno: true, label: 'Con relleno (input nativo)' },
};

export const SinRelleno: Story = {
    args: { options: opciones, relleno: false, label: 'Sin relleno (SVG custom)' },
};

export const ConColor: Story = {
    args: { options: opciones, color: '#4caf50', borderColor: '#9ccc65', label: 'Color personalizado' },
};

export const ConTachado: Story = {
    args: { options: opciones, tachado: true, label: 'Tachar al seleccionar' },
};

export const LimiteSeleccion: Story = {
    args: { options: opciones, maxSelecionados: 2, label: 'Máximo 2 seleccionados' },
};

export const Requerido: Story = {
    args: { options: opciones, required: true, label: 'Requerido' },
};

export const Controlado: Story = {
    name: 'Modo controlado',
    render: args => {
        const [vals, setVals] = useState<string[]>(['uno']);
        return (
            <CheckboxGroup
                {...args}
                value={vals}
                onChange={v => {
                    setVals(v);
                    args.onChange?.(v); // Actions
                }}
                label={`Seleccionados: ${vals.join(', ') || 'ninguno'}`}
            />
        );
    },
};

/** A11y: agrega semántica accesible alrededor para que axe lo evalúe mejor */
export const Accesible: Story = {
    name: 'Accesible (role & aria-labelledby)',
    render: args => {
        const headingId = 'chk-heading';
        return (
            <div role='group' aria-labelledby={headingId}>
                <h2 id={headingId} style={{ fontSize: 16, margin: '8px 0' }}>
                    Preferencias
                </h2>
                <CheckboxGroup {...args} label={undefined} />
            </div>
        );
    },
    args: { options: opciones },
    parameters: {
        a11y: {
            // puedes habilitar/deshabilitar reglas específicas si quieres
            // config: { rules: [{ id: 'color-contrast', enabled: true }] },
        },
    },
};

/** Interactions: demostra el flujo con play() y el panel Interactions */
export const Interactivo: Story = {
    name: 'Interactivo (play)',
    args: { options: opciones, label: 'Interactivo' },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Marca "dos" y "tres"', async () => {
            const dos = canvas.getByRole('checkbox', { name: /dos/i });
            const tres = canvas.getByRole('checkbox', { name: /tercera/i });
            await userEvent.click(dos);
            await userEvent.click(tres);
            await expect(dos).toBeChecked();
            await expect(tres).toBeChecked();
        });

        await step('Desmarca "dos"', async () => {
            const dos = canvas.getByRole('checkbox', { name: /dos/i });
            await userEvent.click(dos);
            await expect(dos).not.toBeChecked();
        });
    },
};

/** Interactions + A11y de teclado: TAB y Space */
export const Teclado: Story = {
    name: 'Accesibilidad por teclado',
    args: { options: opciones, label: 'Con teclado' },
    play: async ({ canvasElement, step }) => {
        const c = within(canvasElement);
        const primero = c.getByRole('checkbox', { name: /uno/i });

        await step('Foco al primer checkbox', async () => {
            await userEvent.tab();
            await expect(primero).toHaveFocus();
        });

        await step('Activar con Space', async () => {
            await userEvent.keyboard('[Space]');
            await expect(primero).toBeChecked();
        });
    },
};

export const CustomRender: Story = {
    name: 'Custom (CheckboxGroupCustom)',
    render: () => (
        <CheckboxGroupCustom
            opciones={opciones}
            onChange={vals => {
                // lo verás en la consola del iframe y en Actions si conectas args.onChange
                console.log('onChange', vals);
            }}>
            {(opcion, { checked, alternar, disabled }) => (
                <div
                    role='button'
                    tabIndex={0}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && !disabled && alternar()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 30,
                        background: checked
                            ? 'color-mix(in srgb, var(--brand-primary, #4caf50) 10%, var(--background, #fff) 90%)'
                            : 'var(--background, #fff)',
                        border: checked
                            ? '2px solid var(--brand-primary, #4caf50)'
                            : '1px solid var(--surface-third, #bbb)',
                        borderRadius: 12,
                        padding: '14px 22px',
                        margin: '14px 0',
                        boxShadow: checked
                            ? '0 2px 8px 0 color-mix(in srgb, var(--brand-primary, #4caf50) 12%, transparent)'
                            : '0 1px 4px 0 color-mix(in srgb, var(--surface-third, #bbb) 12%, transparent)',
                        transition: 'all 0.2s',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        minWidth: 260,
                        width: 420,
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
                            <span style={{ fontSize: 13.5, color: 'var(--text-secondary, #666)', marginTop: 3 }}>
                                {opcion.descripcion}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </CheckboxGroupCustom>
    ),
};

export const Playground: Story = {
    args: {
        options: opciones,
        orientation: 'vertical',
        label: 'Playground',
        relleno: true,
        lineaMitad: false,
        tachado: false,
    },
};
