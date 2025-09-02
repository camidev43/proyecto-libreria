import type { ReactNode } from 'react';

type Variante = 'flat' | 'bordered' | 'faded' | 'underlined' | 'light' | 'normal';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export type ResultadoValidacion = { invalido: boolean; mensaje?: string | null };

export type TextAreaProps = {
  children?: ReactNode;
  variant?: Variante;
  color?: Color;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg';
  label?: ReactNode;
  labelPlacement?: 'inside' | 'outside';
  fullWidth?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  isInvalid?: boolean;
  validationState?: 'valid' | 'invalid';
  description?: ReactNode;
  errorMessage?: ReactNode | ((v: ResultadoValidacion) => ReactNode);
  validate?: (value: string) => string | { message?: string } | true | null | undefined;
  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  disableAnimation?: boolean;
  classNames?: Partial<
    Record<
      'base' | 'label' | 'inputWrapper' | 'headerWrapper' | 'innerWrapper' | 'input' | 'description' | 'errorMessage',
      string
    >
  >;
  id?: string;
  name?: string;
  rows?: number;
  onChange?: (value: string) => void;
  onClear?: () => void;
};
