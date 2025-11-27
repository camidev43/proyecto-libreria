import type React from 'react';
import type { PropsWithChildren } from 'react';

export type CheckboxContenedorProps = React.LabelHTMLAttributes<HTMLLabelElement> & PropsWithChildren;

export const CheckboxContenedor = ({ children, ...rest }: CheckboxContenedorProps) => {
  return <label {...rest}>{children}</label>;
};
