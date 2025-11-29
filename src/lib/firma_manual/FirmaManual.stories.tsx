import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { FirmaManual } from './FirmaManual';
import { type FirmaManualProps } from './TypesFirma';

const meta: Meta<typeof FirmaManual> = {
  title: 'Componentes/FirmaManual',
  component: FirmaManual,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente de captura de firma digital que soporta dibujo manual y carga de imágenes. Incluye funciones de deshacer, limpiar y consentimiento obligatorio.',
      },
    },
  },
  argTypes: {
    isOpen: {
      description: 'Controla la visibilidad del modal',
      control: 'boolean',
    },
    titulo: {
      description: 'Título del modal',
      control: 'text',
    },
    ancho: {
      description: 'Ancho del canvas en píxeles',
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
    alto: {
      description: 'Alto del canvas en píxeles',
      control: { type: 'range', min: 100, max: 400, step: 50 },
    },
    mostrarBotonSubir: {
      description: 'Mostrar botón para subir imagen',
      control: 'boolean',
    },
    cerrarAlGuardar: {
      description: 'Cerrar modal automáticamente al guardar',
      control: 'boolean',
    },
    textoConsentimiento: {
      description: 'Texto del consentimiento',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FirmaManual>;

const FirmaManualWrapper = (args: FirmaManualProps) => {
  const [isOpen, setIsOpen] = useState(args.isOpen ?? false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  return (
    <div style={{ padding: '2rem' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          background: '#4a9eff',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
        }}
      >
        Abrir Firma Manual
      </button>

      <FirmaManual
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={data => {
          setSignatureData(data);
          console.log('Firma guardada:', data);
        }}
      />

      {signatureData && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Firma guardada:</h3>
          <img src={signatureData} alt="Firma" style={{ border: '1px solid #ccc', borderRadius: '0.5rem' }} />
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: args => <FirmaManualWrapper {...args} />,
  args: {
    titulo: 'Firmar el contrato',
    ancho: 500,
    alto: 200,
    mostrarBotonSubir: false,
    cerrarAlGuardar: false,
  },
};

export const ConBotonSubir: Story = {
  render: args => <FirmaManualWrapper {...args} />,
  args: {
    titulo: 'Firma tu documento',
    ancho: 500,
    alto: 200,
    mostrarBotonSubir: true,
    cerrarAlGuardar: false,
    textoConsentimiento: 'Acepto los términos y condiciones del servicio',
  },
};

export const CierreAutomatico: Story = {
  render: args => <FirmaManualWrapper {...args} />,
  args: {
    titulo: 'Firma rápida',
    ancho: 500,
    alto: 200,
    mostrarBotonSubir: true,
    cerrarAlGuardar: true,
  },
};

export const CanvasGrande: Story = {
  render: args => <FirmaManualWrapper {...args} />,
  args: {
    titulo: 'Firma con detalle',
    ancho: 700,
    alto: 300,
    mostrarBotonSubir: false,
    cerrarAlGuardar: false,
  },
};

export const CanvasPequeño: Story = {
  render: args => <FirmaManualWrapper {...args} />,
  args: {
    titulo: 'Firma compacta',
    ancho: 400,
    alto: 150,
    mostrarBotonSubir: false,
    cerrarAlGuardar: false,
  },
};

export const TextosPersonalizados: Story = {
  render: args => <FirmaManualWrapper {...args} />,
  args: {
    titulo: 'Autorización de contrato',
    textoGuardar: 'Confirmar',
    textoModificar: 'Editar',
    textoDeshacer: 'Atrás',
    textoLimpiar: 'Borrar todo',
    textoAdjuntar: 'Cargar imagen',
    textoConsentimiento: 'He leído y acepto las condiciones legales de este documento',
    ancho: 500,
    alto: 200,
    mostrarBotonSubir: true,
    cerrarAlGuardar: false,
  },
};
