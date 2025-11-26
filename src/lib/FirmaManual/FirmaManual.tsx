import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';

import estilos from './FirmaManual.module.css';
import useFirmaLogica from './useFirmaLogica';
import { IconUndo, IconTrash, IconUpload, IconClose } from '../Iconografia';

export type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: (signatureData: string) => void;
  titulo?: string;
  textoGuardar?: string;
  textoModificar?: string;
  textoDeshacer?: string;
  textoLimpiar?: string;
  textoAdjuntar?: string;
  ancho?: number;
  alto?: number;
  className?: string;
  textoConsentimiento?: string;
  mostrarBotonSubir?: boolean;
  cerrarAlGuardar?: boolean;
};
export type FirmaManualRef = {
  /** Limpia el canvas (borrar todo) */
  limpiar: () => void;
  /** Obtiene la firma como data URL (PNG), o null si no hay firma */
  obtenerDatosFirma: () => string | null;
  /** Devuelve si el canvas está vacío */
  estaVacio: () => boolean;
};
/**
 * FirmaManual - Componente para capturar una firma a mano o subir una imagen
 *
 * Props principales:
 * - `isOpen`: control booleano para abrir/ cerrar
 * - `onClose`: callback cuando el modal se cierra
 * - `onConfirm`: callback con data URL PNG al guardar
 *
 */

export const FirmaManual = forwardRef<FirmaManualRef, Props>(
  (
    {
      isOpen = false,
      onClose,
      onConfirm,
      titulo = 'Firmar el contrato',
      textoGuardar = 'Guardar firma',
      textoModificar = 'Modificar firma',
      textoDeshacer = 'Atrás',
      textoLimpiar = 'Limpiar',
      textoAdjuntar = 'Adjuntar firma',
      ancho = 500,
      alto = 200,
      className,
      textoConsentimiento = 'Al firmar, confirmo que he leído y acepto todos los términos contractuales, los cuales se vuelven legalmente vinculantes',
      mostrarBotonSubir = false,
      cerrarAlGuardar = false,
    },
    ref
  ) => {
    const {
      canvasRef,
      estaVacio,
      limpiarCanvas,
      deshacerUltimoTrazo,
      obtenerDatosFirma,
      configurarCanvas,
      puedeDeshacer,
    } = useFirmaLogica();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const inputArchivoRef = useRef<HTMLInputElement>(null);
    const [aceptoTerminos, setAceptoTerminos] = useState(false);
    const [firmaGuardada, setFirmaGuardada] = useState(false);
    const [imagenAdjunta, setImagenAdjunta] = useState(false);

    useImperativeHandle(ref, () => ({
      limpiar: limpiarCanvas,
      obtenerDatosFirma,
      estaVacio: () => estaVacio,
    }));

    useEffect(() => {
      if (isOpen && canvasRef.current) {
        const canvas = canvasRef.current;

        // Detectar modo oscuro
        const detectarModoOscuro = () => {
          const temaAtributo = document.documentElement.getAttribute('data-theme');
          const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
          return temaAtributo === 'dark' || (temaAtributo === null && prefiereOscuro);
        };

        const esFondoOscuro = detectarModoOscuro();
        const colorFirma = esFondoOscuro ? '#ffffff' : '#000000';

        const limpiarEventos = configurarCanvas(colorFirma, !imagenAdjunta);

        const observador = new MutationObserver(() => {
          const temaAtributo = document.documentElement.getAttribute('data-theme');
          const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const nuevoEsOscuro = temaAtributo === 'dark' || (temaAtributo === null && prefiereOscuro);
          const nuevoColor = nuevoEsOscuro ? '#ffffff' : '#000000';
          const contexto = canvas.getContext('2d');
          if (contexto) {
            contexto.strokeStyle = nuevoColor;
          }
        });

        observador.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['style', 'class'],
        });

        return () => {
          limpiarEventos?.();
          observador.disconnect();
        };
      }
    }, [isOpen, configurarCanvas, canvasRef, imagenAdjunta]);

    // Manejar apertura/cierre del dialog y prevenir scroll del body
    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (isOpen) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      } else {
        dialog.close();
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    const manejarCerrar = useCallback(() => {
      if (onClose) {
        setFirmaGuardada(false);
        setAceptoTerminos(false);
        setImagenAdjunta(false);
        onClose();
      }
    }, [onClose]);

    useEffect(() => {
      if (!isOpen) return;

      const manejarTeclaESC = (evento: KeyboardEvent) => {
        if (evento.key === 'Escape') {
          manejarCerrar();
        }
      };

      document.addEventListener('keydown', manejarTeclaESC);

      return () => {
        document.removeEventListener('keydown', manejarTeclaESC);
      };
    }, [isOpen, manejarCerrar]);

    // Cerrar al hacer click en el backdrop (área fuera del modal)
    const manejarClickDialog = useCallback(
      (evento: MouseEvent<HTMLDialogElement>) => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const rect = dialog.getBoundingClientRect();
        const clickFueraDelModal =
          evento.clientX < rect.left ||
          evento.clientX > rect.right ||
          evento.clientY < rect.top ||
          evento.clientY > rect.bottom;

        if (clickFueraDelModal) {
          manejarCerrar();
        }
      },
      [manejarCerrar]
    );

    /**
     * Save the current signature (image or drawing) and call onConfirm
     * Only works if terms are accepted. If cerrarAlGuardar is true, it also closes the dialog.
     */
    const manejarGuardar = () => {
      const datosFirma = obtenerDatosFirma();
      if (datosFirma && onConfirm && aceptoTerminos) {
        setFirmaGuardada(true);
        onConfirm(datosFirma);
        if (cerrarAlGuardar && onClose) {
          manejarCerrar();
        }
      }
    };

    /** Modify the signature: unlock the canvas and clear the existing image/strokes */
    const manejarModificar = () => {
      setFirmaGuardada(false);
      setImagenAdjunta(false);
      limpiarCanvas();
    };

    /** Load an image from the provided file input into the canvas and lock drawing */
    const manejarAdjuntarImagen = (evento: ChangeEvent<HTMLInputElement>) => {
      const archivo = evento.target.files?.[0];
      if (!archivo || !canvasRef.current) return;

      const lector = new FileReader();
      lector.onload = e => {
        const imagen = new Image();
        imagen.onload = () => {
          const canvas = canvasRef.current;
          const contexto = canvas?.getContext('2d');
          if (!canvas || !contexto) return;

          contexto.clearRect(0, 0, canvas.width, canvas.height);

          const anchoCanvas = canvas.width;
          const altoCanvas = canvas.height;
          const relacionCanvas = anchoCanvas / altoCanvas;
          const relacionImagen = imagen.width / imagen.height;

          let anchoFinal, altoFinal, x, y;

          if (relacionImagen > relacionCanvas) {
            anchoFinal = anchoCanvas;
            altoFinal = anchoCanvas / relacionImagen;
            x = 0;
            y = (altoCanvas - altoFinal) / 2;
          } else {
            altoFinal = altoCanvas;
            anchoFinal = altoCanvas * relacionImagen;
            x = (anchoCanvas - anchoFinal) / 2;
            y = 0;
          }

          contexto.drawImage(imagen, x, y, anchoFinal, altoFinal);
          setImagenAdjunta(true);
        };
        imagen.src = e.target?.result as string;
      };
      lector.readAsDataURL(archivo);
    };

    const manejarClickAdjuntar = () => {
      inputArchivoRef.current?.click();
    };

    const firmaDeshabilitada = firmaGuardada || imagenAdjunta;
    const botonGuardarDeshabilitado = !firmaGuardada && ((estaVacio && !imagenAdjunta) || !aceptoTerminos);

    if (!isOpen) return null;

    return (
      <dialog ref={dialogRef} className={`${estilos.dialog} ${className || ''}`} onClick={manejarClickDialog}>
        <div className={estilos.modal}>
          <div className={estilos.encabezado}>
            <h2 className={estilos.titulo}>{titulo}</h2>
            <button className={estilos.boton_cerrar} onClick={manejarCerrar} type='button' aria-label='Cerrar'>
              <span className={estilos.texto_esc}>ESC</span>
              <IconClose className={estilos.icono_x} />
            </button>
          </div>

          <div className={estilos.contenedor_lienzo}>
            <div className={estilos.area_firma}>
              <canvas
                ref={canvasRef}
                className={`${estilos.lienzo} ${firmaDeshabilitada ? estilos.lienzo_deshabilitado : ''}`}
                width={ancho * 2}
                height={alto * 2}
                style={{
                  pointerEvents: firmaDeshabilitada ? 'none' : 'auto',
                }}
              />

              <div className={estilos.barra_acciones}>
                <div className={estilos.grupo_izquierda}>
                  <button
                    className={estilos.boton_accion}
                    onClick={deshacerUltimoTrazo}
                    type='button'
                    disabled={!puedeDeshacer || firmaDeshabilitada}
                    title={textoDeshacer}>
                    <IconUndo className={estilos.icono} />
                    {textoDeshacer}
                  </button>
                  <span className={estilos.separador}>|</span>
                  <button
                    className={estilos.boton_accion}
                    onClick={limpiarCanvas}
                    type='button'
                    disabled={estaVacio || firmaDeshabilitada}
                    title={textoLimpiar}>
                    <IconTrash className={estilos.icono} />
                    {textoLimpiar}
                  </button>
                </div>
                <button
                  className={estilos.boton_guardar}
                  onClick={firmaGuardada ? manejarModificar : manejarGuardar}
                  type='button'
                  disabled={botonGuardarDeshabilitado}>
                  {firmaGuardada ? textoModificar : textoGuardar}
                </button>
              </div>
            </div>
          </div>

          <div className={estilos.contenedor_consentimiento}>
            <label className={estilos.contenedor_checkbox}>
              <input
                type='checkbox'
                className={estilos.checkbox_nativo}
                checked={aceptoTerminos}
                onChange={e => setAceptoTerminos(e.target.checked)}
              />
              <span className={estilos.checkbox_custom}></span>
              <span className={estilos.texto_consentimiento}>{textoConsentimiento}</span>
            </label>
          </div>

          {mostrarBotonSubir && (
            <div className={estilos.contenedor_subir}>
              <input
                ref={inputArchivoRef}
                type='file'
                accept='image/*'
                className={estilos.input_archivo}
                onChange={manejarAdjuntarImagen}
              />
              <button className={estilos.boton_subir} onClick={manejarClickAdjuntar} type='button'>
                <IconUpload className={estilos.icono} />
                {textoAdjuntar}
              </button>
            </div>
          )}
        </div>
      </dialog>
    );
  }
);

FirmaManual.displayName = 'FirmaManual';

export default FirmaManual;
