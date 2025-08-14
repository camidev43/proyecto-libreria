import clsx from 'clsx';
import {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useImperativeHandle,
    useRef,
    useState,
    type ChangeEvent,
} from 'react';
import type React from 'react';

import BadgeVoz from './BadgeVoz';
import { GrabacionIcono, MicrofonoIcono, SonidoIcono } from './Iconografia';
import estilos from './TextArea.module.css';
import { useHablarEscuchar } from './useHablarEscuchar';

type Variante = 'flat' | 'bordered' | 'faded' | 'underlined' | 'light' | 'normal';
type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export type ResultadoValidacion = { invalido: boolean; mensaje?: string | null };

export type TextAreaProps = {
    children?: React.ReactNode;
    variant?: Variante;
    color?: Color;
    size?: 'sm' | 'md' | 'lg';
    radius?: 'none' | 'sm' | 'md' | 'lg';
    label?: React.ReactNode;
    labelPlacement?: 'inside' | 'outside';
    fullWidth?: boolean;
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    isClearable?: boolean;
    isInvalid?: boolean;
    validationState?: 'valid' | 'invalid';
    description?: React.ReactNode;
    errorMessage?: React.ReactNode | ((v: ResultadoValidacion) => React.ReactNode);
    validate?: (value: string) => string | { message?: string } | true | null | undefined;
    minRows?: number;
    maxRows?: number;
    disableAutosize?: boolean;
    cacheMeasurements?: boolean;
    disableAnimation?: boolean;
    classNames?: Partial<
        Record<
            | 'base'
            | 'label'
            | 'inputWrapper'
            | 'headerWrapper'
            | 'innerWrapper'
            | 'input'
            | 'description'
            | 'errorMessage',
            string
        >
    >;
    id?: string;
    name?: string;
    rows?: number;
    onChange?: (value: string) => void;
    onClear?: () => void;

    badgeDentro?: boolean;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
    const {
        children,
        variant = 'flat',
        color = 'default',
        size = 'md',
        radius = 'md',
        label,
        labelPlacement = 'inside',
        fullWidth = true,
        value,
        defaultValue,
        placeholder,
        startContent,
        endContent,
        isRequired = false,
        isReadOnly,
        isDisabled = false,
        isClearable = false,
        isInvalid,
        validationState,
        description,
        errorMessage,
        validate,
        minRows = 3,
        maxRows = 8,
        disableAutosize = false,
        cacheMeasurements = false,
        disableAnimation = false,
        classNames,
        id,
        name,
        rows,
        onChange,
        onClear,
        badgeDentro = false,
    } = props;

    const reactId = useId();
    const inputId = id ?? `ta-${reactId}`;

    const esControlado = value != null;
    const [valorInterno, setValorInterno] = useState<string>(defaultValue ?? '');
    const val = esControlado ? (value as string) : valorInterno;

    const [enfocado, setEnfocado] = useState(false);
    const [errorInterno, setErrorInterno] = useState<string | null>(null);
    const invalidoComputado =
        isInvalid ?? (validationState === 'invalid' ? true : validationState === 'valid' ? false : !!errorInterno);
    const validacion: ResultadoValidacion = { invalido: !!invalidoComputado, mensaje: errorInterno };

    useEffect(() => {
        if (!validate) return setErrorInterno(null);
        const r = validate(val);
        if (r === true || r == null) setErrorInterno(null);
        else if (typeof r === 'string') setErrorInterno(r);
        else setErrorInterno(r.message ?? 'Entrada inválida');
    }, [val, validate]);

    const taRef = useRef<HTMLTextAreaElement | null>(null);
    const medidasRef = useRef<{ lineHeight: number; paddingBlock: number } | null>(null);

    const redimensionar = useCallback(() => {
        if (disableAutosize || !taRef.current) return;
        const el = taRef.current;
        const cs = getComputedStyle(el);
        let lineHeight = 0;
        let paddingBlock = 0;
        if (cacheMeasurements && medidasRef.current) {
            ({ lineHeight, paddingBlock } = medidasRef.current);
        } else {
            lineHeight = parseFloat(cs.lineHeight || '0');
            paddingBlock = parseFloat(cs.paddingTop || '0') + parseFloat(cs.paddingBottom || '0');
            if (cacheMeasurements) medidasRef.current = { lineHeight, paddingBlock };
        }
        el.style.height = 'auto';
        const contentHeight = el.scrollHeight;
        const minH = Math.max(minRows, 1) * lineHeight + paddingBlock;
        const maxH = Math.max(maxRows, minRows) * lineHeight + paddingBlock;
        el.style.height = `${Math.max(minH, Math.min(contentHeight, maxH))}px`;
    }, [disableAutosize, cacheMeasurements, minRows, maxRows]);

    useEffect(() => {
        redimensionar();
    }, [val, minRows, maxRows, disableAutosize, redimensionar]);

    useImperativeHandle(ref, () => taRef.current as HTMLTextAreaElement);

    const {
        puedeHablar,
        hablando,
        escuchar,
        detenerHablar,
        puedeEscuchar,
        escuchando,
        errorDictado,
        dictar,
        detenerDictado,
    } = useHablarEscuchar({
        isDisabled,
        isReadOnly,
        value: val,
        onChange: (nuevo: string) => {
            if (!esControlado) setValorInterno(nuevo);
            onChange?.(nuevo);
        },
        redimensionar,
    });

    const puedeEjecutarEscuchar = puedeHablar && !escuchando && !hablando && !isDisabled && !!val;
    const puedeEjecutarDictar = puedeEscuchar && !hablando && !escuchando && !isDisabled && !isReadOnly;
    const puedeDetenerHablar = puedeHablar && hablando;
    const puedeDetenerDictado = puedeEscuchar && escuchando;

    const manejarCambio = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (isDisabled || isReadOnly) return;
        if (!esControlado) setValorInterno(e.target.value);
        onChange?.(e.target.value);
    };

    const limpiar = () => {
        if (isDisabled || isReadOnly) return;
        if (!esControlado) setValorInterno('');
        onChange?.('');
        onClear?.();
        requestAnimationFrame(() => taRef.current?.focus());
    };

    const errorSlot = typeof errorMessage === 'function' ? errorMessage(validacion) : (errorMessage ?? errorInterno);
    const mostrarHeaderInside = labelPlacement === 'inside' && (label || isClearable || puedeHablar || puedeEscuchar);
    const mostrarLimpiar = isClearable && !!val && !isReadOnly && !isDisabled;

    const clasesBase = clsx(
        estilos.contenedor_base,
        estilos[`variante_${variant}`],
        estilos[`color_${color}`],
        estilos[`tam_${size}`],
        estilos[`radio_${radius}`],
        fullWidth && estilos.ancho_total,
        disableAnimation && estilos.sin_animacion,
        isDisabled && estilos.deshabilitado,
        invalidoComputado && estilos.invalido,
        enfocado && estilos.enfocado,
        classNames?.base
    );

    // Helpers UI
    const Acciones = () => (
        <div className={estilos.acciones_header}>
            <button
                type='button'
                className={clsx(estilos.boton_tts, hablando && estilos.boton_activo)}
                onMouseDown={hablando ? detenerHablar : escuchar}
                disabled={!puedeEjecutarEscuchar && !puedeDetenerHablar}
                title='Escuchar'>
                <SonidoIcono />
            </button>
            {puedeEscuchar && (
                <button
                    type='button'
                    className={clsx(estilos.boton_tts, escuchando && estilos.boton_activo_mic)}
                    onMouseDown={escuchando ? detenerDictado : dictar}
                    disabled={!puedeEjecutarDictar && !puedeDetenerDictado}
                    title='Dictar'>
                    {escuchando ? <GrabacionIcono color='red' /> : <MicrofonoIcono />}
                </button>
            )}
            {mostrarLimpiar && (
                <button type='button' className={estilos.boton_limpiar} onMouseDown={limpiar} title='Limpiar'>
                    ×
                </button>
            )}
        </div>
    );

    const Badges = ({ estirar = false }: { estirar?: boolean }) => (
        <>
            {escuchando && (
                <BadgeVoz tipo='mic' texto='Habla ahora' size={size} {...(estirar ? { estirar: true } : {})} />
            )}
            {hablando && (
                <BadgeVoz tipo='tts' texto='Reproduciendo' size={size} {...(estirar ? { estirar: true } : {})} />
            )}
        </>
    );

    const HeaderOutside = ({ conBadge = true }: { conBadge?: boolean }) => (
        <div className={estilos.fila_acciones}>
            {label && (
                <label
                    className={clsx(estilos.etiqueta, estilos.etiqueta_externa, classNames?.label)}
                    htmlFor={inputId}>
                    {label} {isRequired && <span className={estilos.marca_requerido}>*</span>}
                </label>
            )}
            <div className={estilos.acciones_grupo}>
                <Acciones />
                {conBadge && <Badges />}
            </div>
        </div>
    );

    // ===== outside / inside =====
    return (
        <div className={clasesBase}>
            {labelPlacement === 'outside' && <HeaderOutside conBadge={!badgeDentro} />}

            <div className={clsx(estilos.envoltorio_input, classNames?.inputWrapper)}>
                {labelPlacement === 'inside' && mostrarHeaderInside && (
                    <div className={clsx(estilos.encabezado_interno, classNames?.headerWrapper)}>
                        {label && (
                            <label className={clsx(estilos.etiqueta_interna, classNames?.label)} htmlFor={inputId}>
                                {label} {isRequired && <span className={estilos.marca_requerido}>*</span>}
                            </label>
                        )}
                        <div className={estilos.acciones_grupo}>
                            <Acciones />
                            <Badges estirar />
                        </div>
                    </div>
                )}

                {/* Si fuera y badgeDentro=true, mostramos el badge dentro del wrapper */}
                {labelPlacement === 'outside' && badgeDentro && (
                    <div className={estilos.estado_interno}>
                        <Badges estirar />
                    </div>
                )}

                <div className={clsx(estilos.contenedor_interior, classNames?.innerWrapper)}>
                    {startContent && <div className={estilos.inicio}>{startContent}</div>}
                    <textarea
                        ref={taRef}
                        id={inputId}
                        name={name}
                        placeholder={placeholder}
                        value={esControlado ? val : undefined}
                        defaultValue={esControlado ? undefined : (defaultValue ?? '')}
                        onChange={manejarCambio}
                        onFocus={() => setEnfocado(true)}
                        onBlur={() => setEnfocado(false)}
                        className={clsx(estilos.entrada, disableAutosize && estilos.sin_autosize, classNames?.input)}
                        readOnly={isReadOnly}
                        disabled={isDisabled}
                        rows={rows ?? minRows}
                    />
                    {endContent && <div className={estilos.fin}>{endContent}</div>}
                </div>
            </div>

            {description && <div className={clsx(estilos.descripcion, classNames?.description)}>{description}</div>}
            {(errorSlot || errorDictado) && (
                <div className={clsx(estilos.mensaje_error, classNames?.errorMessage)}>
                    {errorSlot}
                    {errorDictado && <span className={estilos.mensaje_error}>{errorDictado}</span>}
                </div>
            )}
            {children}
        </div>
    );
});

TextArea.displayName = 'TextArea';
export default TextArea;
