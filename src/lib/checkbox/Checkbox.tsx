import clsx from 'clsx';
import type React from 'react';
import { forwardRef, useId, useState, useEffect } from 'react';

import styles from './Checkbox.module.css';
import type { CheckboxProps } from './types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    children,
    isSelected,
    defaultChecked,
    isIndeterminate = false,
    isDisabled = false,
    isReadOnly = false,
    lineThrough = false,
    onlyIcon = false,
    disableAnimation = false,
    size = 'md',
    color = 'primary',
    radius = 'md',
    className = '',
    classNames = {},
    onChange,
    ...otherProps
  } = props;

  const uniqueId = useId();
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

  const isChecked = isSelected !== undefined ? isSelected : internalChecked;

  useEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      ref.current.indeterminate = isIndeterminate ?? false;
    }
  }, [isIndeterminate, ref]);

  const manejarCambio = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled || isReadOnly) return;
    const newState = event.target.checked;
    if (isSelected === undefined) setInternalChecked(newState);
    onChange?.(newState);
  };

  return (
    <label
      className={clsx(
        styles.checkbox_wrapper,
        styles[size],
        styles[color],
        styles[`radius_${radius}`],
        {
          [styles.checked]: isChecked,
          [styles.disabled]: isDisabled,
          [styles.readonly]: isReadOnly,
          [styles.line_through]: lineThrough && isChecked,
        },
        classNames.base,
        className,
      )}
    >
      <input
        ref={ref}
        id={uniqueId}
        type="checkbox"
        className={clsx(
          styles.input,
          {
            [styles.only_icon]: onlyIcon,
            [styles.no_animation]: disableAnimation,
          },
          classNames.wrapper,
        )}
        checked={isChecked}
        onChange={manejarCambio}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...otherProps}
      />

      {children && <span className={clsx(styles.label_text, classNames.label)}>{children}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
