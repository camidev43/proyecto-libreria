import type React from 'react';
import { useState, type HTMLAttributes } from 'react';
import './transiciones.css';

type Props = {
  mostrar: boolean;
  children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function TransicionDesvanecerDeslizar({ mostrar, children, ...resto }: Props) {
  const [mounted, setMounted] = useState(mostrar);
  const [animationState, setAnimationState] = useState<'entering' | 'exiting' | null>(mostrar ? 'entering' : null);

  if (mostrar && !mounted) {
    setMounted(true);
    setAnimationState('entering');
  } else if (!mostrar && mounted && animationState !== 'exiting') {
    setAnimationState('exiting');
  }

  const handleAnimationEnd = () => {
    if (animationState === 'entering') {
      setAnimationState(null);
    } else if (animationState === 'exiting') {
      setMounted(false);
      setAnimationState(null);
    }
  };

  if (!mounted) return null;

  return (
    <div
      {...resto}
      onAnimationEnd={handleAnimationEnd}
      className={
        animationState === 'entering'
          ? 'transicion_desvanecer_deslizar_entrada'
          : animationState === 'exiting'
            ? 'transicion_desvanecer_deslizar_salida'
            : ''
      }
    >
      {children}
    </div>
  );
}
