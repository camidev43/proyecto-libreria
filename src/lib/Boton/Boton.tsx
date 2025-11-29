import clsx from 'clsx';
import { forwardRef, useRef, type ElementType, type MouseEvent, type ComponentPropsWithoutRef } from 'react';

import styles from './Boton.module.css';
import type { BotonProps } from './typesButton';

const BotonBase = <C extends ElementType = 'button'>(
  {
    as,
    variant = 'solid',
    color = 'default',
    size = 'sm',
    radius = 'md',
    fullWidth = false,
    isLoading = false,
    onlyLoading = false,
    isDisabled = false,
    isIconOnly = false,
    startContent,
    endContent,
    spinner,
    spinnerPlacement = 'end',
    disableRipple = false,
    disableAnimation = true,
    children,
    className,
    onClick,
    ...props
  }: BotonProps<C>,
  ref: ComponentPropsWithoutRef<C>['ref'],
) => {
  const Component = as || 'button';
  const internalRef = useRef<HTMLElement>(null);

  const isButtonDisabled = isDisabled || isLoading;
  const shouldHideContent = isLoading && (onlyLoading || isIconOnly);

  const classes = clsx(
    styles.boton,
    styles[variant],
    styles[color],
    styles[size],
    styles[`radius_${radius}`],
    fullWidth && !isIconOnly && styles.full_width,
    isButtonDisabled && styles.disabled,
    isIconOnly && styles.icon_only,
    isLoading && styles.loading,
    shouldHideContent && styles.only_loading,
    !disableAnimation && styles.tap_animation,
    className,
  );

  const manejarClick = (e: MouseEvent<HTMLElement>) => {
    if (isButtonDisabled && Component === 'a') {
      e.preventDefault();
    }

    if (typeof onClick === 'function') {
      onClick(e as MouseEvent<HTMLButtonElement>);
    }

    if (!disableRipple && !isButtonDisabled && internalRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
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

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        const cleanup = () => ripple.remove();
        ripple.addEventListener('animationend', cleanup, { once: true });
        btn.appendChild(ripple);
      }
    }
  };

  const spinnerElement = (
    <span className={styles.spinner} aria-label="Cargando">
      {spinner ?? <div className={styles.modern_spinner} />}
    </span>
  );

  return (
    <Component
      {...props}
      ref={instance => {
        (internalRef as React.MutableRefObject<HTMLElement | null>).current = instance;
        if (typeof ref === 'function') {
          ref(instance);
        } else if (ref && 'current' in ref) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = instance;
        }
      }}
      className={classes}
      disabled={Component === 'button' ? isButtonDisabled : undefined}
      aria-disabled={isButtonDisabled}
      tabIndex={isButtonDisabled ? -1 : undefined}
      onClick={manejarClick}
      role={Component !== 'button' ? 'button' : undefined}
    >
      <span className={styles.inner}>
        {isLoading && spinnerPlacement === 'start' && spinnerElement}
        {!shouldHideContent && startContent && <span className={styles.start}>{startContent}</span>}
        {!shouldHideContent && children && <span className={styles.label}>{children}</span>}
        {!shouldHideContent && endContent && <span className={styles.end}>{endContent}</span>}
        {isLoading && spinnerPlacement === 'end' && spinnerElement}
      </span>
    </Component>
  );
};

export const Boton = forwardRef(BotonBase);
