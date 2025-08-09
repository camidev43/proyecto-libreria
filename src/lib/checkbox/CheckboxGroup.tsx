import clsx from 'clsx';
import { useState, useCallback, useMemo } from 'react';

import styles from './Checkbox.module.css';
import CheckboxOption from './CheckboxOpciones';
import type { CheckboxGroupProps } from './types';
import { GrupoContexto } from './useCheckbox';

const CheckboxGroup = ({
    options,
    orientation = 'vertical',
    valores,
    valoresIniciales = [],
    onChange,
    disabled = false,
    size,
    radius,
    color,
    borderColor,
    className,
    lineaMitad,
    classInterna,
    label,
    relleno = true,
    maxSelecionados,
    tachado = false,
    required,
    requiredConAsterisco,
    readOnly = false,
}: CheckboxGroupProps) => {
    const [internos, setInternos] = useState<string[]>(valores ?? valoresIniciales);
    const actuales = valores ?? internos;

    const limite = typeof maxSelecionados === 'number' && maxSelecionados > 0 ? maxSelecionados : 0;
    const limiteAlcanzado = limite > 0 && actuales.length >= limite;

    const isOpcionDisabled = useCallback(
        (valor: string) => {
            if (disabled || readOnly) return true;
            if (!limite) return false;
            // Si alcanzamos el límite, solo permitimos desmarcar las ya seleccionadas
            const yaMarcada = actuales.includes(valor);
            return limiteAlcanzado && !yaMarcada;
        },
        [actuales, disabled, readOnly, limite, limiteAlcanzado]
    );

    const alternar = useCallback(
        (valor: string) => {
            if (isOpcionDisabled(valor)) return;

            const yaMarcada = actuales.includes(valor);
            let siguiente: string[];
            if (yaMarcada) {
                siguiente = actuales.filter(v => v !== valor);
            } else {
                siguiente = [...actuales, valor];
            }

            if (valores === undefined) {
                setInternos(siguiente);
            }
            onChange?.(siguiente);
        },
        [actuales, valores, onChange, isOpcionDisabled]
    );

    const ctxValue = useMemo(
        () => ({
            valores: actuales,
            alternar,
            disabled,
            relleno,
            size,
            radius,
            color,
            borderColor,
            lineaMitad,
            maxSelecionados: limite || undefined,
            tachado,
            readOnly,
            limiteAlcanzado,
            isOpcionDisabled,
        }),
        [
            actuales,
            alternar,
            disabled,
            relleno,
            size,
            radius,
            color,
            borderColor,
            lineaMitad,
            limite,
            tachado,
            readOnly,
            limiteAlcanzado,
            isOpcionDisabled,
        ]
    );

    const showLabel = !!label;
    const mustAsterisk = showLabel && !!requiredConAsterisco;

    return (
        <GrupoContexto.Provider value={ctxValue}>
            <section
                className={clsx(styles.group)}
                aria-disabled={disabled || readOnly}
                aria-required={required}
                role='group'
                aria-label={typeof label === 'string' ? label : undefined}>
                {showLabel ? (
                    <>
                        <h6 className={clsx(styles.label, required && styles.required)}>
                            {label}
                            {mustAsterisk && (
                                <span className={styles.asterisk} aria-hidden='true'>
                                    *
                                </span>
                            )}
                        </h6>

                        {limite > 0 && (
                            <div className={styles.maxHint} aria-live='polite'>
                                Opciones máximas ({limite})
                            </div>
                        )}
                    </>
                ) : null}

                <div className={clsx(orientation === 'horizontal' ? styles.horizontal : styles.vertical, className)}>
                    {options.map(opt => (
                        <CheckboxOption
                            key={opt.value}
                            option={opt}
                            orientation={orientation}
                            classInterna={classInterna}
                        />
                    ))}
                </div>
            </section>
        </GrupoContexto.Provider>
    );
};

export default CheckboxGroup;
