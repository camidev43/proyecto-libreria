import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import BadgeVoz from './BadgeVoz';
import { useReconocimientoVoz } from './useReconocimientoVoz';

const meta: Meta = {
  title: 'Componentes/ReconocimientoVoz',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Sistema de reconocimiento de voz que permite dictar texto y reproducir contenido usando Web Speech API.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {
  render: () => {
    const [text, setText] = useState('');
    const {
      dictar,
      escuchando,
      puedeEscuchar,
      puedeHablar,
      escuchar,
      hablando,
      detenerDictado,
      detenerHablar,
      errorDictado,
    } = useReconocimientoVoz({ value: text, onChange: setText });

    return (
      <div style={{ display: 'grid', gap: 16, maxWidth: 600 }}>
        <div style={{ position: 'relative' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={6}
            placeholder="Escribe o dicta tu texto aquí..."
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '2px solid #e0e0e0',
              fontFamily: 'system-ui',
              fontSize: 14,
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={() => (hablando ? detenerHablar() : escuchar())}
            disabled={!puedeHablar || !text}
            style={{
              padding: '10px 20px',
              borderRadius: 6,
              border: 'none',
              background: hablando ? '#dc2626' : '#3b82f6',
              color: 'white',
              cursor: puedeHablar && text ? 'pointer' : 'not-allowed',
              opacity: !puedeHablar || !text ? 0.5 : 1,
              fontWeight: 500,
            }}
          >
            {hablando ? '⏹ Detener lectura' : '🔊 Leer texto'}
          </button>

          <button
            onClick={() => (escuchando ? detenerDictado() : dictar())}
            disabled={!puedeEscuchar}
            style={{
              padding: '10px 20px',
              borderRadius: 6,
              border: 'none',
              background: escuchando ? '#dc2626' : '#10b981',
              color: 'white',
              cursor: puedeEscuchar ? 'pointer' : 'not-allowed',
              opacity: !puedeEscuchar ? 0.5 : 1,
              fontWeight: 500,
            }}
          >
            {escuchando ? '⏹ Detener dictado' : '🎤 Dictar'}
          </button>

          <button
            onClick={() => setText('')}
            disabled={!text}
            style={{
              padding: '10px 20px',
              borderRadius: 6,
              border: '2px solid #e0e0e0',
              background: 'white',
              color: '#374151',
              cursor: text ? 'pointer' : 'not-allowed',
              opacity: !text ? 0.5 : 1,
              fontWeight: 500,
            }}
          >
            🗑 Limpiar
          </button>
        </div>

        {(escuchando || hablando) && (
          <div style={{ display: 'flex', gap: 8 }}>
            {escuchando && <BadgeVoz tipo="mic" texto="Escuchando..." size="md" />}
            {hablando && <BadgeVoz tipo="tts" texto="Leyendo..." size="md" />}
          </div>
        )}

        {errorDictado && (
          <div
            style={{
              padding: 12,
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: 6,
              fontSize: 14,
            }}
          >
            ⚠️ {errorDictado}
          </div>
        )}

        <div
          style={{
            padding: 12,
            background: '#f3f4f6',
            borderRadius: 6,
            fontSize: 13,
            color: '#6b7280',
          }}
        >
          <strong>Estado:</strong> {escuchando ? '🎤 Escuchando...' : hablando ? '🔊 Reproduciendo...' : '⚪ Inactivo'}
          <br />
          <strong>Caracteres:</strong> {text.length}
        </div>
      </div>
    );
  },
};

export const BadgesMic: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h3 style={{ marginBottom: 12 }}>Tamaños - Micrófono</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <BadgeVoz tipo="mic" texto="Pequeño" size="sm" />
          <BadgeVoz tipo="mic" texto="Mediano" size="md" />
          <BadgeVoz tipo="mic" texto="Grande" size="lg" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 12 }}>Estirado</h3>
        <BadgeVoz tipo="mic" texto="Escuchando tu voz..." size="md" estirar />
      </div>
    </div>
  ),
};

export const BadgesTTS: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h3 style={{ marginBottom: 12 }}>Tamaños - Text-to-Speech</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <BadgeVoz tipo="tts" texto="Pequeño" size="sm" />
          <BadgeVoz tipo="tts" texto="Mediano" size="md" />
          <BadgeVoz tipo="tts" texto="Grande" size="lg" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 12 }}>Estirado</h3>
        <BadgeVoz tipo="tts" texto="Leyendo contenido..." size="md" estirar />
      </div>
    </div>
  ),
};

export const EjemploCompleto: Story = {
  render: () => {
    const [text, setText] = useState(
      'Ejemplo de texto para probar la funcionalidad de texto a voz. Puedes agregar más contenido dictando.',
    );
    const [idioma, setIdioma] = useState<'es-ES' | 'en-US'>('es-ES');
    const [isDisabled, setIsDisabled] = useState(false);

    const {
      dictar,
      escuchando,
      puedeEscuchar,
      puedeHablar,
      escuchar,
      hablando,
      detenerDictado,
      detenerHablar,
      errorDictado,
    } = useReconocimientoVoz({
      value: text,
      onChange: setText,
      idioma,
      isDisabled,
      onDictadoCompleto: () => console.log('Dictado completado'),
    });

    return (
      <div style={{ display: 'grid', gap: 16, maxWidth: 700 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <label style={{ fontSize: 14, fontWeight: 500 }}>Idioma:</label>
          <select
            value={idioma}
            onChange={e => setIdioma(e.target.value as 'es-ES' | 'en-US')}
            style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #d1d5db' }}
          >
            <option value="es-ES">Español</option>
            <option value="en-US">English</option>
          </select>

          <label style={{ fontSize: 14, fontWeight: 500, marginLeft: 16 }}>
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={e => setIsDisabled(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Deshabilitado
          </label>
        </div>

        <div style={{ position: 'relative' }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={8}
            placeholder="Tu contenido aquí..."
            disabled={isDisabled}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '2px solid #e0e0e0',
              fontFamily: 'system-ui',
              fontSize: 14,
              resize: 'vertical',
              opacity: isDisabled ? 0.6 : 1,
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => (hablando ? detenerHablar() : escuchar())}
            disabled={!puedeHablar || !text || isDisabled}
            style={{
              padding: '10px 20px',
              borderRadius: 6,
              border: 'none',
              background: hablando ? '#dc2626' : '#3b82f6',
              color: 'white',
              cursor: puedeHablar && text && !isDisabled ? 'pointer' : 'not-allowed',
              opacity: !puedeHablar || !text || isDisabled ? 0.5 : 1,
              fontWeight: 500,
            }}
          >
            {hablando ? '⏹ Detener' : '🔊 Leer'}
          </button>

          <button
            onClick={() => (escuchando ? detenerDictado() : dictar())}
            disabled={!puedeEscuchar || isDisabled}
            style={{
              padding: '10px 20px',
              borderRadius: 6,
              border: 'none',
              background: escuchando ? '#dc2626' : '#10b981',
              color: 'white',
              cursor: puedeEscuchar && !isDisabled ? 'pointer' : 'not-allowed',
              opacity: !puedeEscuchar || isDisabled ? 0.5 : 1,
              fontWeight: 500,
            }}
          >
            {escuchando ? '⏹ Detener' : '🎤 Dictar'}
          </button>

          {(escuchando || hablando) && (
            <>
              {escuchando && <BadgeVoz tipo="mic" texto="Escuchando..." size="md" />}
              {hablando && <BadgeVoz tipo="tts" texto="Leyendo..." size="md" />}
            </>
          )}
        </div>

        {errorDictado && (
          <div
            style={{
              padding: 12,
              background: '#fee2e2',
              color: '#991b1b',
              borderRadius: 6,
              fontSize: 14,
            }}
          >
            ⚠️ {errorDictado}
          </div>
        )}

        <div
          style={{
            padding: 12,
            background: '#f3f4f6',
            borderRadius: 6,
            fontSize: 13,
            display: 'grid',
            gap: 4,
          }}
        >
          <div>
            <strong>Estado:</strong> {escuchando ? '🎤 Escuchando' : hablando ? '🔊 Reproduciendo' : '⚪ Inactivo'}
          </div>
          <div>
            <strong>Idioma:</strong> {idioma === 'es-ES' ? '🇪🇸 Español' : '🇺🇸 English'}
          </div>
          <div>
            <strong>Caracteres:</strong> {text.length}
          </div>
          <div>
            <strong>Compatibilidad:</strong> TTS: {puedeHablar ? '✅' : '❌'} | STT: {puedeEscuchar ? '✅' : '❌'}
          </div>
        </div>
      </div>
    );
  },
};
