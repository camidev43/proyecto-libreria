import type { ReactNode, ElementType, ComponentPropsWithoutRef } from 'react';

export type BotonBaseProps = {
  variant?: 'solid' | 'bordered' | 'light' | 'faded' | 'ghost' | 'shadow';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  fullWidth?: boolean;
  isLoading?: boolean;
  onlyLoading?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  spinner?: ReactNode;
  spinnerPlacement?: 'start' | 'end';
  disableRipple?: boolean;
  disableAnimation?: boolean;
};

export type BotonProps<C extends ElementType> = BotonBaseProps &
  Omit<ComponentPropsWithoutRef<C>, keyof BotonBaseProps | 'as'> & {
    as?: C;
  };
