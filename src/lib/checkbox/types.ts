import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type CheckboxRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type CheckboxOrientation = 'horizontal' | 'vertical';

export type CheckboxClassNames = {
  base?: string;
  wrapper?: string;
  icon?: string;
  label?: string;
};

export type CheckboxProps = {
  children?: ReactNode;
  isSelected?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  size?: CheckboxSize;
  color?: CheckboxColor;
  radius?: CheckboxRadius;
  lineThrough?: boolean;
  onlyIcon?: boolean;
  disableAnimation?: boolean;
  onChange?: (isSelected: boolean) => void;
  className?: string;
  classNames?: CheckboxClassNames;
  value?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>;

export type CheckboxGroupProps = {
  label?: string;
  children: ReactNode;
  description?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  orientation?: CheckboxOrientation;
  className?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
};
