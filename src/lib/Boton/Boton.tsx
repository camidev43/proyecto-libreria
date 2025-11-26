import clsx from 'clsx';
import { forwardRef, useRef, type MouseEvent, type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './Boton.module.css';

export type Variant = 'solid' | 'bordered' | 'light' | 'faded' | 'ghost' | 'shadow';
export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type Size = 'sm' | 'md' | 'lg';
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type SpinnerPlacement = 'start' | 'end';

export type BotonProps = {
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  fullWidth?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  startContent?: ReactNode;
  endContent?: ReactNode;
  spinner?: ReactNode;
  spinnerPlacement?: SpinnerPlacement;
  disableRipple?: boolean;
  disableAnimation?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Boton = forwardRef<HTMLButtonElement, BotonProps>(
  (
    {
      variant = 'solid',
      color = 'default',
      size = 'md',
      radius = 'md',
      fullWidth = false,
      isLoading = false,
      isDisabled = false,
      isIconOnly = false,
      startContent,
      endContent,
      spinner,
      spinnerPlacement,
      disableRipple = false,
      disableAnimation = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLButtonElement>(null);

    const classes = clsx(
      styles.boton,
      styles[variant],
      styles[color],
      styles[size],
      styles[`radius_${radius}`],
      fullWidth && !isIconOnly && styles.full_width,
      (isDisabled || props.disabled) && styles.disabled,
      isIconOnly && styles.icon_only,
      isLoading && styles.loading,
      !disableAnimation && styles.tap_animation,
      className
    );

    const mostrarLabel = !!children && (!isLoading || !isIconOnly);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (!disableRipple && !isDisabled && !isLoading && internalRef.current) {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const btn = internalRef.current;
          const ripple = document.createElement('span');
          ripple.className = styles.ripple;
          ripple.setAttribute('aria-hidden', 'true');

          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const dx = Math.max(x, rect.width - x);
          const dy = Math.max(y, rect.height - y);
          const radius = Math.hypot(dx, dy);
          const size = radius * 2;

          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;

          ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
          btn.appendChild(ripple);
        }
      }
      props.onClick?.(e);
    };

    return (
      <button
        {...props}
        aria-busy={isLoading}
        ref={instance => {
          internalRef.current = instance;
          if (typeof ref === 'function') ref(instance);
          else if (ref) ref.current = instance;
        }}
        type={props.type || 'button'}
        className={classes}
        disabled={isDisabled || isLoading}
        onClick={handleClick}>
        <span className={styles.inner}>
          {startContent && !isLoading && <span className={styles.start}>{startContent}</span>}

          {mostrarLabel && <span className={styles.label}>{children}</span>}

          {isLoading && <span className={styles.spinner}>{spinner ?? <div className={styles.modern_spinner} />}</span>}

          {endContent && !isLoading && <span className={styles.end}>{endContent}</span>}
        </span>
      </button>
    );
  }
);

Boton.displayName = 'Boton';

export { Boton };
