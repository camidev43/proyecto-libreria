import clsx from 'clsx';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';

import { TransicionDesvanecerDeslizar } from '@/lib/animations';
import { BadgeVoz, useReconocimientoVoz } from '@/lib/hablar_escuchar';
import { GrabacionIcono, MicrofonoIcono, SonidoIcono } from '@/lib/hablar_escuchar/Iconografia';

import estilos from './TextArea.module.css';
import type { TextAreaProps, ResultadoValidacion } from './types';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    children,
    variant = 'flat',
    color = 'default',
    size = 'md',
    radius = 'md',
    label,
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
    disableAnimation = false,
    classNames,
    id,
    name,
    rows,
    onChange,
    onClear,
    ...restProps
  } = props;

  const reactId = useId();
  const inputId = id ?? `ta-${reactId}`;

  const esControlado = value !== undefined;
  const [valorInterno, setValorInterno] = useState<string>(defaultValue ?? '');
  const val = esControlado ? (value as string) : valorInterno;

  const [enfocado, setEnfocado] = useState(false);

  const errorInterno = useMemo(() => {
    if (!validate) return null;
    const resultado = validate(val);
    if (resultado === true || resultado == null) return null;
    if (typeof resultado === 'string') return resultado;
    if (typeof resultado === 'object' && 'message' in resultado) {
      return resultado.message ?? 'Entrada inválida';
    }
    return 'Entrada inválida';
  }, [val, validate]);

  const esInvalido = useMemo(() => {
    if (isInvalid !== undefined) return isInvalid;
    if (validationState === 'invalid') return true;
    if (validationState === 'valid') return false;
    return !!errorInterno;
  }, [isInvalid, validationState, errorInterno]);

  const validacion: ResultadoValidacion = { invalido: esInvalido, mensaje: errorInterno };

  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const redimensionar = useCallback(() => {
    if (!taRef.current || disableAutosize) return;
    const el = taRef.current;
    el.style.height = 'auto';
    const scrollH = el.scrollHeight;
    const minH = minRows * 24;
    const maxH = maxRows * 24;
    el.style.height = `${Math.min(Math.max(scrollH, minH), maxH)}px`;
  }, [disableAutosize, minRows, maxRows]);

  useEffect(() => {
    if (!disableAutosize) {
      redimensionar();
    }
  }, [val, redimensionar, disableAutosize]);

  useImperativeHandle(ref, () => taRef.current as HTMLTextAreaElement);

  const manejarCambioVoz = useCallback(
    (nuevo: string) => {
      if (!esControlado) setValorInterno(nuevo);
      onChange?.(nuevo);
    },
    [esControlado, onChange],
  );

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
  } = useReconocimientoVoz({
    isDisabled,
    isReadOnly,
    value: val,
    onChange: manejarCambioVoz,
  });

  const manejarCambio = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (isDisabled || isReadOnly) return;
      const nuevoValor = e.target.value;
      if (!esControlado) setValorInterno(nuevoValor);
      onChange?.(nuevoValor);
    },
    [esControlado, isDisabled, isReadOnly, onChange],
  );

  const limpiar = useCallback(() => {
    if (isDisabled || isReadOnly) return;
    if (!esControlado) setValorInterno('');
    onChange?.('');
    onClear?.();
    requestAnimationFrame(() => {
      taRef.current?.focus();
    });
  }, [esControlado, isDisabled, isReadOnly, onChange, onClear]);

  const handleEscuchar = useCallback(() => {
    if (hablando) detenerHablar();
    else escuchar();
  }, [hablando, escuchar, detenerHablar]);

  const handleDictar = useCallback(() => {
    if (escuchando) detenerDictado();
    else dictar();
  }, [escuchando, dictar, detenerDictado]);

  const errorSlot = typeof errorMessage === 'function' ? errorMessage(validacion) : (errorMessage ?? errorInterno);
  const mostrarLimpiar = isClearable && !!val && !isReadOnly && !isDisabled;
  const hayBadge = escuchando || hablando;

  const descId = description ? `${inputId}-desc` : undefined;
  const errId = errorSlot || errorDictado ? `${inputId}-err` : undefined;
  const ariaDescribedBy = [descId, errId].filter(Boolean).join(' ') || undefined;

  const clasesBase = clsx(
    estilos.contenedor_base,
    estilos[`variante_${variant}`],
    estilos[`color_${color}`],
    estilos[`tam_${size}`],
    estilos[`radio_${radius}`],
    fullWidth && estilos.ancho_total,
    disableAnimation && estilos.sin_animacion,
    isDisabled && estilos.deshabilitado,
    esInvalido && estilos.invalido,
    enfocado && estilos.enfocado,
    classNames?.base,
  );

  const renderAcciones = () => (
    <div className={estilos.acciones_header}>
      <button
        type="button"
        className={clsx(estilos.boton_tts, hablando && estilos.boton_activo)}
        onClick={handleEscuchar}
        disabled={!puedeHablar || (!hablando && (!val || escuchando))}
        title={hablando ? 'Detener lectura' : 'Leer texto'}
        aria-pressed={hablando}
        tabIndex={-1}
      >
        <SonidoIcono />
      </button>

      {puedeEscuchar && (
        <button
          type="button"
          className={clsx(estilos.boton_tts, escuchando && estilos.boton_activo_mic)}
          onClick={handleDictar}
          disabled={isDisabled || isReadOnly || hablando}
          title={escuchando ? 'Detener dictado' : 'Dictar texto'}
          aria-pressed={escuchando}
          tabIndex={-1}
        >
          {escuchando ? <GrabacionIcono color="red" /> : <MicrofonoIcono />}
        </button>
      )}

      {mostrarLimpiar && (
        <button
          type="button"
          className={estilos.boton_limpiar}
          onClick={limpiar}
          title="Borrar contenido"
          aria-label="Borrar contenido"
          tabIndex={-1}
        >
          ×
        </button>
      )}
    </div>
  );

  const renderBadges = () => (
    <>
      <TransicionDesvanecerDeslizar mostrar={escuchando}>
        <BadgeVoz tipo="mic" texto="Escuchando..." size={size === 'lg' ? 'md' : 'sm'} />
      </TransicionDesvanecerDeslizar>
      <TransicionDesvanecerDeslizar mostrar={hablando}>
        <BadgeVoz tipo="tts" texto="Leyendo..." size={size === 'lg' ? 'md' : 'sm'} />
      </TransicionDesvanecerDeslizar>
    </>
  );

  return (
    <div className={clasesBase}>
      <div className={estilos.fila_acciones}>
        {label && (
          <label className={clsx(estilos.etiqueta, estilos.etiqueta_externa, classNames?.label)} htmlFor={inputId}>
            {label}{' '}
            {isRequired && (
              <span className={estilos.marca_requerido} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className={estilos.acciones_grupo}>
          {renderAcciones()}
          <div
            className={clsx(estilos.badges_wrap, hayBadge && estilos.badges_wrap_visible)}
            aria-live="polite"
            role="status"
          >
            {renderBadges()}
          </div>
        </div>
      </div>

      <div className={clsx(estilos.envoltorio_input, classNames?.inputWrapper)}>
        <div className={clsx(estilos.contenedor_interior, classNames?.innerWrapper)}>
          {startContent && <div className={estilos.inicio}>{startContent}</div>}

          <textarea
            {...restProps}
            ref={taRef}
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={esControlado ? val : undefined}
            defaultValue={esControlado ? undefined : (defaultValue ?? '')}
            onChange={manejarCambio}
            onFocus={e => {
              setEnfocado(true);
              props.onFocus?.(e);
            }}
            onBlur={e => {
              setEnfocado(false);
              props.onBlur?.(e);
            }}
            className={clsx(estilos.entrada, disableAutosize && estilos.sin_autosize, classNames?.input)}
            readOnly={isReadOnly}
            disabled={isDisabled}
            rows={rows ?? minRows}
            aria-invalid={esInvalido || undefined}
            aria-describedby={ariaDescribedBy}
            aria-required={isRequired}
          />

          {endContent && <div className={estilos.fin}>{endContent}</div>}
        </div>
      </div>

      {description && (
        <div id={descId} className={clsx(estilos.descripcion, classNames?.description)}>
          {description}
        </div>
      )}

      {(errorSlot || errorDictado) && (
        <div id={errId} className={clsx(estilos.mensaje_error, classNames?.errorMessage)} role="alert">
          {errorSlot}
          {errorSlot && errorDictado && <br />}
          {errorDictado && <span>Error voz: {errorDictado}</span>}
        </div>
      )}

      {children}
    </div>
  );
});

TextArea.displayName = 'TextArea';
export { TextArea };
