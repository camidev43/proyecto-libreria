/// <reference lib="dom" />
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import type React from 'react';

import { TextArea } from './TextArea';

const meta = {
  title: 'Componentes/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Área de texto con auto‐resize, validación, `minRows` / `maxRows`, controles de voz, estados y más. ' +
          'A continuación se muestran ejemplos que cubren las props clave.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['flat', 'bordered', 'faded', 'underlined', 'light', 'normal'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    labelPlacement: { control: 'select', options: ['inside', 'outside'] },
    minRows: { control: 'number' },
    maxRows: { control: 'number' },
    fullWidth: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
    onChange: { action: 'cambio' },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children, w = 420 }: { children: React.ReactNode; w?: number }) => (
  <div style={{ width: w, maxWidth: '100%', margin: '1rem auto' }}>{children}</div>
);

export const TextAreaStory: Story = {
  name: 'TextArea',
  args: {
    label: 'Descripción',
    placeholder: 'Escribe aquí…',
    variant: 'flat',
    color: 'primary',
    size: 'md',
  },
  render: args => (
    <Box>
      <TextArea {...args} />
    </Box>
  ),
  parameters: { docs: { description: { story: 'Uso mínimo del componente.' } } },
};

export const Tamaños: Story = {
  render: args => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <Box w={360}>
        <TextArea {...args} size='sm' label='sm – Pequeño' placeholder='Pequeño' />
      </Box>
      <Box w={360}>
        <TextArea {...args} size='md' label='md – Mediano' placeholder='Mediano' />
      </Box>
      <Box w={360}>
        <TextArea {...args} size='lg' label='lg – Grande' placeholder='Grande' />
      </Box>
    </div>
  ),
  parameters: { docs: { description: { story: 'Comparativa de tamaños.' } } },
};

export const Colores: Story = {
  render: args => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
      {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map(c => (
        <Box key={c} w={340}>
          <TextArea {...args} color={c} label={c} placeholder={c} />
        </Box>
      ))}
    </div>
  ),
  args: { variant: 'bordered' },
  parameters: { docs: { description: { story: 'Misma variante con 6 colores.' } } },
};

export const LabelPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Box w={380}>
        <TextArea label='Etiqueta Outside' labelPlacement='outside' placeholder='Texto…' />
      </Box>
      <Box w={380}>
        <TextArea label='Etiqueta Inside' labelPlacement='inside' placeholder='Texto…' />
      </Box>
    </div>
  ),
  parameters: { docs: { description: { story: '`labelPlacement` dentro o fuera del área.' } } },
};

export const MinMaxRows: Story = {
  render: () => (
    <Box w={500}>
      <TextArea
        label='minRows=2  maxRows=6'
        placeholder='Escribe líneas para ver el auto‐resize…'
        minRows={2}
        maxRows={6}
        defaultValue={'Línea 1\nLínea 2\nLínea 3\nLínea 4'}
      />
    </Box>
  ),
  parameters: { docs: { description: { story: 'El alto crece hasta `maxRows` y luego aparece scroll.' } } },
};

export const Validacion: Story = {
  render: () => (
    <Box w={420}>
      <TextArea
        label='Validación async'
        placeholder='Mínimo 10 caracteres'
        isClearable
        validate={v => (v.length >= 10 ? true : 'Debe tener al menos 10 caracteres')}
        errorMessage={r => r.mensaje}
      />
    </Box>
  ),
  parameters: { docs: { description: { story: 'Ejemplo de prop `validate` mostrando mensaje de error.' } } },
};

export const VozDictado: Story = {
  render: () => (
    <Box w={500}>
      <TextArea
        label='Prueba voz'
        placeholder='Dicta o escucha…'
        variant='bordered'
        color='secondary'
        description='Requiere API de voz.'
      />
    </Box>
  ),
  parameters: { docs: { description: { story: 'Botones de habla/dictado (si el navegador lo permite).' } } },
};

export const AccionOnChange: Story = {
  args: {
    label: 'onChange demo',
    placeholder: 'Observa Actions',
    onChange: () => {},
  },
  render: args => (
    <Box>
      <TextArea {...args} />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const ta = c.getByPlaceholderText(/Observa/);
    await userEvent.type(ta, 'Hola');
    await expect(ta).toHaveValue('Hola');
  },
  parameters: { docs: { disable: true } },
};
