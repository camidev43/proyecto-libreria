import React, { useState, useCallback, useMemo } from 'react';

import type { CheckboxGroupCustomProps } from './types';

const CheckboxGroupCustom = <T extends { value: string }>({
  opciones,
  valoresIniciales = [],
  onChange,
  disabled = false,
  children,
}: CheckboxGroupCustomProps<T>) => {
  const [selected, setSelected] = useState<string[]>(valoresIniciales);

  const toggle = useCallback(
    (value: string) => {
      setSelected(prev => {
        const next = prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value];
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  const ctx = useMemo(() => ({ selected, toggle, disabled }), [selected, toggle, disabled]);

  return (
    <>
      {opciones.map(opcion => {
        const isChecked = ctx.selected.includes(opcion.value);
        const alternar = () => !ctx.disabled && ctx.toggle(opcion.value);
        return (
          <React.Fragment key={opcion.value}>
            {children(opcion, {
              checked: isChecked,
              alternar,
              disabled: ctx.disabled,
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CheckboxGroupCustom;
