import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { useState } from 'react';

import { TextArea } from './TextArea';

const meta = {
  title: 'Componentes/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'faded'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Predeterminado: Story = {
  args: {
    label: 'Short feedback',
    placeholder: "This week's highlights...",
  },
};

export const Desvanecido: Story = {
  args: {
    label: 'Detailed notes',
    placeholder: 'Write out the full meeting notes...',
    variant: 'faded',
    isClearable: true,
  },
};

export const ConError: Story = {
  args: {
    label: 'Campo con Error',
    defaultValue: 'Texto inválido',
    isInvalid: true,
    errorMessage: 'Este campo tiene un error crítico',
  },
};

export const Tamanios: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TextArea label="Small" placeholder="Pequeño..." size="sm" />
      <TextArea label="Medium" placeholder="Mediano..." size="md" />
      <TextArea label="Large" placeholder="Grande..." size="lg" />
    </div>
  ),
};

export const Requerido: Story = {
  args: {
    label: 'Campo Requerido',
    placeholder: 'Este campo es obligatorio...',
    isRequired: true,
  },
};

export const SoloLectura: Story = {
  args: {
    label: 'Solo Lectura',
    value: 'Este texto no se puede editar',
    isReadOnly: true,
    variant: 'faded',
  },
};

export const Deshabilitado: Story = {
  args: {
    label: 'Deshabilitado',
    defaultValue: 'Campo deshabilitado',
    isDisabled: true,
  },
};

export const Controlado: Story = {
  render: () => {
    const [valor, setValor] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextArea
          label="Textarea Controlado"
          placeholder="Escribe algo..."
          value={valor}
          onChange={setValor}
          isClearable
        />
        <div style={{ color: 'var(--color-secondary-text)', fontSize: 'var(--label)' }}>Caracteres: {valor.length}</div>
      </div>
    );
  },
};

export const ConValidacion: Story = {
  render: () => {
    const [valor, setValor] = useState('');
    return (
      <TextArea
        label="Con Validación"
        placeholder="Escribe al menos 10 caracteres..."
        value={valor}
        onChange={setValor}
        validate={val => {
          if (val.length < 10) return 'Mínimo 10 caracteres requeridos';
          return true;
        }}
        isClearable
      />
    );
  },
};

export const ConContador: Story = {
  render: () => {
    const [valor, setValor] = useState('');
    const maxCaracteres = 280;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <TextArea
          label="Compose an announcement..."
          placeholder="Write your announcement..."
          value={valor}
          onChange={setValor}
          validate={val => {
            if (val.length > maxCaracteres) return `Máximo ${maxCaracteres} caracteres`;
            return true;
          }}
          isClearable
        />
        <div style={{ alignSelf: 'flex-start', color: 'var(--color-secondary-text)', fontSize: 'var(--label)' }}>
          Characters: {valor.length} / {maxCaracteres}
        </div>
      </div>
    );
  },
};

export const TodasVariantes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <TextArea label="Default" placeholder="Variante default..." />
      <TextArea label="Faded" placeholder="Variante faded..." variant="faded" />
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <TextArea
        label="Título Largo Que Prueba Responsive"
        placeholder="Escribe algo..."
        defaultValue="Contenido de prueba para responsive"
        isClearable
      />
    </div>
  ),
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
  },
};
