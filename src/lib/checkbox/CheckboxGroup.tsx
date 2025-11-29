import clsx from 'clsx';
import React from 'react';

import styles from './CheckboxGroup.module.css';
import type { CheckboxGroupProps, CheckboxProps } from './types';

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  children,
  description,
  errorMessage,
  isInvalid,
  orientation = 'vertical',
  className = '',
  value = [],
  onChange,
  isDisabled,
  isReadOnly,
}) => {
  const handleGroupChange = (itemValue: string, isSelected: boolean) => {
    if (!onChange) return;
    const newValues = isSelected ? [...value, itemValue] : value.filter(v => v !== itemValue);
    onChange(newValues);
  };

  return (
    <div className={clsx(styles.checkbox_group, className)}>
      {label && <span className={styles.group_label}>{label}</span>}

      <div
        role="group"
        className={clsx(styles.checkbox_list, {
          [styles.horizontal]: orientation === 'horizontal',
          [styles.vertical]: orientation === 'vertical',
        })}
      >
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child;
          const childProps = child.props as CheckboxProps;

          return React.cloneElement(child as React.ReactElement<CheckboxProps>, {
            isDisabled: isDisabled || childProps.isDisabled,
            isReadOnly: isReadOnly || childProps.isReadOnly,
            isSelected: childProps.value ? value.includes(childProps.value) : childProps.isSelected,
            onChange: (selected: boolean) => {
              if (childProps.value) handleGroupChange(childProps.value, selected);
              childProps.onChange?.(selected);
            },
          });
        })}
      </div>

      {isInvalid && errorMessage ? (
        <span className={styles.error_message}>{errorMessage}</span>
      ) : description ? (
        <span className={styles.description}>{description}</span>
      ) : null}
    </div>
  );
};
