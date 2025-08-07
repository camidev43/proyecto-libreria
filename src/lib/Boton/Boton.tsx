// Boton.tsx
import { forwardRef, type MouseEvent, useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Boton.module.css';

export type Variant = 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'ghost' | 'shadow';
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
            spinnerPlacement = 'start',
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
            fullWidth && styles.full_width,
            (isDisabled || props.disabled) && styles.disabled,
            isIconOnly && styles.iconOnly,
            isLoading && styles.loading,
            !disableAnimation && styles.tap_animation,
            className
        );

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
                setTimeout(() => ripple.remove(), 600);
            }
            props.onClick?.(e);
        };

        return (
            <button
                {...props}
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
                    {isLoading && spinnerPlacement === 'start' && (
                        <span className={styles.spinner}>{spinner ?? <span className={styles.default_spinner} />}</span>
                    )}
                    {!isIconOnly && <span className={styles.label}>{children}</span>}
                    {isLoading && spinnerPlacement === 'end' && (
                        <span className={styles.spinner}>{spinner ?? <span className={styles.default_spinner} />}</span>
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
