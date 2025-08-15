import clsx from 'clsx';
import {
  forwardRef,
  type MouseEvent,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';

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
        const ripple = document.createElement('span');
        ripple.className = styles.ripple;
        const rect = internalRef.current.getBoundingClientRect();
        const sizePx = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${sizePx * 2}px`;
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        internalRef.current.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
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

          {mostrarLabel && (
            <span className={styles.label} style={{ opacity: isLoading ? 0.7 : 1 }}>
              {children}
            </span>
          )}

          {isLoading && (
            <span className={styles.spinner}>
              {spinner ?? <div className={styles.modern_spinner} />}
            </span>
          )}

          {endContent && !isLoading && <span className={styles.end}>{endContent}</span>}
        </span>
      </button>
    );
  }
);

Boton.displayName = 'Boton';

export { Boton };
export default Boton;
