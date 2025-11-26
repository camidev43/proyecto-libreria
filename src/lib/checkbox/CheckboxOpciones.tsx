import clsx from 'clsx';

import styles from './Checkbox.module.css';
import CheckBoxIndicador from './ChekboxIndicador';
import type { CheckboxOptions } from './types';
import { useCheckboxGroup } from './useCheckbox';

const CheckboxOption = ({ option, orientation, className, classInterna }: CheckboxOptions) => {
  const {
    valores,
    alternar,
    disabled,
    borderColor,
    color,
    radius,
    relleno,
    size,
    lineaMitad,
    tachado,
    isOpcionDisabled,
    readOnly,
  } = useCheckboxGroup();

  const checked = valores.includes(option.value);
  const disabledOpcion = isOpcionDisabled(option.value);

  return (
    <label
      className={clsx(
        styles.option,
        orientation === 'horizontal' ? styles.opcion_horizontal : styles.opcion_vertical,
        lineaMitad && styles.linea,
        (disabled || readOnly) && styles.disabled,
        disabledOpcion && styles.deshabilitado_limite,
        className
      )}
      aria-disabled={disabledOpcion}>
      <CheckBoxIndicador
        relleno={relleno}
        checked={checked}
        disabled={disabledOpcion}
        color={color}
        borderColor={borderColor}
        radius={radius}
        size={size}
        alternar={() => alternar(option.value)}
        ariaLabel={option.label}
      />

      <div className={clsx(styles.texts, classInterna, tachado && checked && styles.tachado)}>
        <div className={styles.label}>{option.label}</div>
        {option.descripcion && <p className={styles.description}>{option.descripcion}</p>}
      </div>
    </label>
  );
};

export default CheckboxOption;
