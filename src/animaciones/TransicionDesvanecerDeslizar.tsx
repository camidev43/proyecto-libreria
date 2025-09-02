import type React from 'react';
import { useLayoutEffect, useState, type HTMLAttributes } from 'react';
import '../env/App/transiciones.css';

type Props = {
  mostrar: boolean;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function TransicionDesvanecerDeslizar({ mostrar, children, ...resto }: Props) {
  const [visible, setVisible] = useState(mostrar);
  const [animandoEntrada, setAnimandoEntrada] = useState(false);

  useLayoutEffect(() => {
    if (mostrar && !visible) {
      setVisible(true);
      setAnimandoEntrada(true);
    } else if (!mostrar) {
      setVisible(false);
      setAnimandoEntrada(false);
    }
  }, [mostrar, visible]);

  const handleAnimationEnd = () => {
    if (animandoEntrada) {
      setAnimandoEntrada(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      {...resto}
      onAnimationEnd={handleAnimationEnd}
      className={animandoEntrada ? 'transicion_desvanecer_deslizar_entrada' : ''}>
      {children}
    </div>
  );
}
