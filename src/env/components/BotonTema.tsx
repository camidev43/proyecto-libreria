import type React from 'react';
import { useRef } from 'react';

import css from './BotonTemaFancy.module.css';
import { useTemaStore, registrarCoordenadasFallbackDesdeElemento } from '../App/IniciarTema';

/**
 * Toggle “nubes/estrellas” basado en tu snippet.
 * - Controlado por Zustand (checked = tema === 'dark').
 * - Si se activa con teclado (sin coords), centra la onda en el botón.
 * - Mantiene el HTML semántico (label + input).
 */
export default function BotonTemaFancy() {
  const tema = useTemaStore(s => s.tema);
  const alternar = useTemaStore(s => s.alternarTema);
  const labelRef = useRef<HTMLLabelElement>(null);

  const checked = tema === 'dark';

  //TODO me deja cambiar con el teclado y se hace tan rapido que se desincroniza
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ne = e.nativeEvent;
    if (!(ne instanceof MouseEvent) || (ne.clientX === 0 && ne.clientY === 0)) {
      if (labelRef.current) registrarCoordenadasFallbackDesdeElemento(labelRef.current);
    }
    alternar();
  };

  return (
    <label
      ref={labelRef}
      className={css.switch}
      title={`Cambiar a tema ${checked ? 'claro' : 'oscuro'}`}
      aria-label='Alternar tema'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
        aria-label={`Tema ${checked ? 'oscuro' : 'claro'}`}
      />
      <span className={css.slider} aria-hidden />
      <span className={css.clouds_stars} aria-hidden />
    </label>
  );
}
