import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type ResultadoValidacion = { invalido: boolean; mensaje?: string | null };

export type UseTextAreaLogicArgs = {
    value?: string;
    defaultValue?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isClearable?: boolean;
    validate?: (value: string) => string | { message?: string } | true | null | undefined;
    onChange?: (value: string) => void;
    onClear?: () => void;
};

export type UseTextAreaLogic = {
    /** valor actual (controlado o interno) */
    value: string;
    /** cambia el valor respetando disabled/readOnly y controlado/no-controlado */
    handleChange: (next: string) => void;
    /** limpia el valor y dispara onClear */
    clear: () => void;
    /** estado de foco para estilos */
    focused: boolean;
    setFocused: (v: boolean) => void;
    /** resultado de validación derivado de validate/isInvalid */
    validation: ResultadoValidacion;
    /** indica si debe mostrarse el botón clear */
    showClear: boolean;
    /** callback para que el componente fuerce el autosize (test-friendly: no hace nada aquí) */
    redimensionar: () => void;
    /** flags de conveniencia para acciones de voz (derivadas de props simples) */
    canSpeak: boolean;
    canListen: boolean;
};

export default function useLogic({
    value,
    defaultValue,
    isDisabled = false,
    isReadOnly = false,
    isClearable = false,
    validate,
    onChange,
    onClear,
}: UseTextAreaLogicArgs): UseTextAreaLogic {
    const isControlled = value != null;
    const [inner, setInner] = useState<string>(defaultValue ?? '');
    const val = isControlled ? (value as string) : inner;

    const [focused, setFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Validación
    useEffect(() => {
        if (!validate) {
            setError(null);
            return;
        }
        const r = validate(val);
        if (r === true || r == null) setError(null);
        else if (typeof r === 'string') setError(r);
        else setError(r.message ?? 'Entrada inválida');
    }, [val, validate]);

    const handleChange = useCallback(
        (next: string) => {
            if (isDisabled || isReadOnly) return;
            if (!isControlled) setInner(next);
            onChange?.(next);
        },
        [isDisabled, isReadOnly, isControlled, onChange]
    );

    const clear = useCallback(() => {
        if (isDisabled || isReadOnly) return;
        if (!isControlled) setInner('');
        onChange?.('');
        onClear?.();
    }, [isDisabled, isReadOnly, isControlled, onChange, onClear]);

    const showClear = isClearable && !!val && !isReadOnly && !isDisabled;

    // En este hook sólo exponemos el callback; el componente aplica el tamaño al DOM.
    const redimensionar = useRef<() => void>(() => {}).current;

    // Valores de conveniencia para acciones de voz (simplificados)
    const canSpeak = !!val && !isDisabled;
    const canListen = !isReadOnly && !isDisabled;

    const validation = useMemo<ResultadoValidacion>(() => {
        return { invalido: !!error, mensaje: error };
    }, [error]);

    return {
        value: val,
        handleChange,
        clear,
        focused,
        setFocused,
        validation,
        showClear,
        redimensionar,
        canSpeak,
        canListen,
    };
}
