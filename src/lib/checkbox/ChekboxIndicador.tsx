import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { useId, useState } from 'react';

import estilos from './EstCheckbox.module.css';
import type { CheckBoxIndicadorProps } from './types';

const CheckBoxIndicador = ({
  relleno = true,
  checked,
  alternar,
  disabled = false,
  size,
  radius = 'var(--radius-2)',
  color = 'var(--brand-primary)',
  borderColor = 'var(--surface-third)',
  ariaLabel,
}: CheckBoxIndicadorProps) => {
  const id = useId();
  const isControlled = typeof checked !== 'undefined';
  const [internal, setInternal] = useState(false);
  const actual = isControlled ? checked! : internal;

  const handleChange = () => {
    if (disabled) return;
    if (isControlled) {
      alternar?.();
    } else {
      setInternal(v => !v);
    }
  };

  const vars = {
    '--checkbox-diameter': size,
    '--checkbox-border-radius': radius,
    '--primary-color': color,
    '--checkbox-border-color': borderColor,
    '--border-color': borderColor,
  };

  const styleVars = vars as CSSProperties;

  if (relleno) {
    return (
      <input
        id={id}
        type='checkbox'
        checked={actual}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={clsx(estilos.ui_checkbox, disabled ? estilos.disabled : '')}
        style={{
          ...styleVars,
        }}
      />
    );
  }

  return (
    <label htmlFor={id} className={estilos.container} style={styleVars}>
      <input
        id={id}
        type='checkbox'
        checked={actual}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={estilos.input_oculto}
      />

      <svg className={clsx(estilos.svg)} width={size} height={size} viewBox='0 0 18 18'>
        <rect x='1' y='1' width='16' height='16' rx='3' className={estilos.svg_rect} />
        <polyline transform='translate(0,1)' points='4 9 7 12 14 5' className={estilos.svg_check} />
      </svg>
    </label>
  );
};

export default CheckBoxIndicador;
