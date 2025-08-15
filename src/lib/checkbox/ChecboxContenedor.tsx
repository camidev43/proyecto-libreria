import type React from 'react';
import type { PropsWithChildren } from 'react';

export type CheckboxContenedorProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  PropsWithChildren;

const CheckboxContenedor = ({ children, ...rest }: CheckboxContenedorProps) => {
  return <label {...rest}>{children}</label>;
};

export default CheckboxContenedor;
