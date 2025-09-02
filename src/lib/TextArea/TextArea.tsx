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

import TransicionDesvanecerDeslizar from '@/animaciones/TransicionDesvanecerDeslizar';

import BadgeVoz from './BadgeVoz';
import { GrabacionIcono, MicrofonoIcono, SonidoIcono } from './Iconografia';
import estilos from './TextArea.module.css';
import type { TextAreaProps } from './types';
import { useHablarEscuchar } from './useHablarEscuchar';
import type { ResultadoValidacion } from './useLogic';

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
    disableAnimation = false,
    classNames,
    id,
    name,
    rows,
    onChange,
    onClear,
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
    const resultado = validate(val);
    if (resultado === true || resultado == null) setErrorInterno(null);
    else if (typeof resultado === 'string') setErrorInterno(resultado);
    else setErrorInterno(resultado.message ?? 'Entrada inválida');
  }, [val, validate]);

  const taRef = useRef<HTMLTextAreaElement | null>(null);

  const redimensionar = useCallback(() => {
    if (!taRef.current || disableAutosize) return;
    const el = taRef.current;
    el.style.height = 'auto';
    const newHeight = Math.min(Math.max(el.scrollHeight, minRows * 24), maxRows * 24);
    el.style.height = `${newHeight}px`;
  }, [disableAutosize, minRows, maxRows]);

  useEffect(() => {
    redimensionar();
  }, [val, redimensionar]);

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

  const handleEscuchar = () => (hablando ? detenerHablar() : escuchar());
  const handleDictar = () => (escuchando ? detenerDictado() : dictar());

  const errorSlot = typeof errorMessage === 'function' ? errorMessage(validacion) : (errorMessage ?? errorInterno);
  const mostrarLimpiar = isClearable && !!val && !isReadOnly && !isDisabled;
  const hayBadge = escuchando || hablando;
  const mostrarHeaderInside = labelPlacement === 'inside' && (label || isClearable || puedeHablar || puedeEscuchar);

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
    labelPlacement === 'outside' && estilos.label_outside,
    invalidoComputado && estilos.invalido,
    enfocado && estilos.enfocado,
    classNames?.base
  );

  const renderAcciones = () => (
    <div className={estilos.acciones_header}>
      <button
        type='button'
        className={clsx(estilos.boton_tts, hablando && estilos.boton_activo)}
        onClick={handleEscuchar}
        disabled={!puedeHablar || (!hablando && (!val || escuchando))}
        title='Escuchar'
        aria-pressed={hablando}>
        <SonidoIcono />
      </button>

      {puedeEscuchar && (
        <button
          type='button'
          className={clsx(estilos.boton_tts, escuchando && estilos.boton_activo_mic)}
          onClick={handleDictar}
          disabled={isDisabled || isReadOnly || hablando}
          title='Dictar'
          aria-pressed={escuchando}>
          {escuchando ? <GrabacionIcono color='red' /> : <MicrofonoIcono />}
        </button>
      )}

      {mostrarLimpiar && (
        <button
          type='button'
          className={estilos.boton_limpiar}
          onClick={limpiar}
          title='Limpiar'
          aria-label='Limpiar contenido'>
          ×
        </button>
      )}
    </div>
  );

  const renderBadges = () => (
    <>
      <TransicionDesvanecerDeslizar mostrar={escuchando}>
        <BadgeVoz tipo='mic' texto='Habla ahora' size={size} />
      </TransicionDesvanecerDeslizar>
      <TransicionDesvanecerDeslizar mostrar={hablando}>
        <BadgeVoz tipo='tts' texto='Reproduciendo' size={size} />
      </TransicionDesvanecerDeslizar>
    </>
  );

  return (
    <div className={clasesBase}>
      {/* Header outside */}
      {labelPlacement === 'outside' && (
        <div className={estilos.fila_acciones}>
          {label && (
            <label className={clsx(estilos.etiqueta, estilos.etiqueta_externa, classNames?.label)} htmlFor={inputId}>
              {label} {isRequired && <span className={estilos.marca_requerido}>*</span>}
            </label>
          )}
          <div className={estilos.acciones_grupo}>
            {renderAcciones()}
            <div
              className={clsx(estilos.badges_wrap, hayBadge && estilos.badges_wrap_visible)}
              aria-live='polite'
              role='status'>
              {renderBadges()}
            </div>
          </div>
        </div>
      )}

      <div className={clsx(estilos.envoltorio_input, classNames?.inputWrapper)}>
        {/* Header inside */}
        {mostrarHeaderInside && (
          <div className={clsx(estilos.encabezado_interno, classNames?.headerWrapper)}>
            {label && (
              <label className={clsx(estilos.etiqueta_interna, classNames?.label)} htmlFor={inputId}>
                {label} {isRequired && <span className={estilos.marca_requerido}>*</span>}
              </label>
            )}
            <div className={estilos.acciones_grupo}>
              {renderAcciones()}
              <div
                className={clsx(estilos.badges_wrap, hayBadge && estilos.badges_wrap_visible)}
                aria-live='polite'
                role='status'>
                {renderBadges()}
              </div>
            </div>
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
            aria-invalid={invalidoComputado || undefined}
            aria-describedby={ariaDescribedBy}
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
        <div id={errId} className={clsx(estilos.mensaje_error, classNames?.errorMessage)}>
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
