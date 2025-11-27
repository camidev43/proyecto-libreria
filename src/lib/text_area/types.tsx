import type { ReactNode, TextareaHTMLAttributes } from 'react';

export type Variant = 'flat' | 'bordered' | 'faded' | 'underlined' | 'light' | 'normal';
export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type Size = 'sm' | 'md' | 'lg';
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';

type NativeTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'color' | 'onChange' | 'children'>;

export type ValidationResult = boolean | string | { message?: string } | null | undefined;

export type ResultadoValidacion = { invalido: boolean; mensaje: string | null };

export type TextAreaProps = {
  children?: ReactNode;
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  label?: ReactNode;
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

  // Tipado estricto para errorMessage
  errorMessage?: ReactNode | ((v: { invalido: boolean; mensaje: string | null }) => ReactNode);

  validate?: (value: string) => ValidationResult;

  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  disableAnimation?: boolean;
  classNames?: {
    base?: string;
    label?: string;
    inputWrapper?: string;
    innerWrapper?: string;
    input?: string;
    description?: string;
    errorMessage?: string;
  };
  onChange?: (value: string) => void;
  onClear?: () => void;
} & NativeTextareaProps;
