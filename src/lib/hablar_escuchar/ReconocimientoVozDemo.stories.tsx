import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BadgeVoz, useReconocimientoVoz } from '.';

const meta: Meta = {
  title: 'Componentes/Voz/ReconocimientoVoz',
  tags: ['autodocs'],
};

export default meta;

export const Demo: StoryObj = {
  render: () => {
    const [text, setText] = useState('');
    const { dictar, escuchando, puedeEscuchar, puedeHablar, escuchar, hablando, detenerDictado, detenerHablar } =
      useReconocimientoVoz({ value: text, onChange: setText });

    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => (hablando ? detenerHablar() : escuchar())} disabled={!puedeHablar}>
            {hablando ? 'Detener lectura' : 'Leer'}
          </button>
          <button onClick={() => (escuchando ? detenerDictado() : dictar())} disabled={!puedeEscuchar}>
            {escuchando ? 'Detener dictado' : 'Dictar'}
          </button>
        </div>
        <div>
          Estado: {escuchando ? 'Escuchando' : hablando ? 'Hablando' : 'Inactivo'}
        </div>
      </div>
    );
  },
};
