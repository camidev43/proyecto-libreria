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
import { IconUndo, IconTrash, IconUpload, IconClose } from './Iconografia';
import type { FirmaManualRef, FirmaManualProps } from './TypesFirma';
import useFirmaLogica from './useFirmaLogica';

const FirmaManual = forwardRef<FirmaManualRef, FirmaManualProps>(
  (
    {
      isOpen = false,
      onClose,
      onConfirm,
      titulo = 'Firmar el contrato',
      textoGuardar = 'Guardar firma',
      textoModificar = 'Modificar firma',
      textoDeshacer = 'Deshacer',
      textoLimpiar = 'Limpiar',
      textoAdjuntar = 'Adjuntar firma',
      ancho = 500,
      alto = 200,
      className,
      textoConsentimiento = 'Al firmar, confirmo que he leído y acepto todos los términos contractuales',
      mostrarBotonSubir = false,
      cerrarAlGuardar = false,
    },
    ref,
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
          attributeFilter: ['data-theme'],
        });

        return () => {
          limpiarEventos?.();
          observador.disconnect();
        };
      }
    }, [isOpen, configurarCanvas, canvasRef, imagenAdjunta]);

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
      return () => document.removeEventListener('keydown', manejarTeclaESC);
    }, [isOpen, manejarCerrar]);

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
      [manejarCerrar],
    );

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

    const manejarModificar = () => {
      setFirmaGuardada(false);
      setImagenAdjunta(false);
      limpiarCanvas();
    };

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
      <dialog
        ref={dialogRef}
        className={`${estilos.dialog} ${className || ''}`}
        onClick={manejarClickDialog}
        aria-labelledby="firma-titulo"
        aria-describedby="firma-consentimiento"
      >
        <div className={estilos.modal}>
          <header className={estilos.encabezado}>
            <h2 id="firma-titulo" className={estilos.titulo}>
              {titulo}
            </h2>
            <button className={estilos.boton_cerrar} onClick={manejarCerrar} type="button" aria-label="Cerrar">
              <span className={estilos.texto_esc}>ESC</span>
              <IconClose className={estilos.icono_x} />
            </button>
          </header>

          <div className={estilos.contenedor_lienzo}>
            <div className={estilos.area_firma}>
              <canvas
                ref={canvasRef}
                className={`${estilos.lienzo} ${firmaDeshabilitada ? estilos.lienzo_deshabilitado : ''}`}
                width={ancho * 2}
                height={alto * 2}
                style={{ pointerEvents: firmaDeshabilitada ? 'none' : 'auto' }}
                aria-label="Área de firma"
              />

              <div className={estilos.barra_acciones} role="toolbar" aria-label="Herramientas de firma">
                <div className={estilos.grupo_izquierda}>
                  <button
                    className={estilos.boton_accion}
                    onClick={deshacerUltimoTrazo}
                    type="button"
                    disabled={!puedeDeshacer || firmaDeshabilitada}
                    aria-label={textoDeshacer}
                  >
                    <IconUndo className={estilos.icono} aria-hidden="true" />
                    <span>{textoDeshacer}</span>
                  </button>
                  <span className={estilos.separador} aria-hidden="true">
                    |
                  </span>
                  <button
                    className={estilos.boton_accion}
                    onClick={limpiarCanvas}
                    type="button"
                    disabled={estaVacio || firmaDeshabilitada}
                    aria-label={textoLimpiar}
                  >
                    <IconTrash className={estilos.icono} aria-hidden="true" />
                    <span>{textoLimpiar}</span>
                  </button>
                </div>
                <button
                  className={estilos.boton_guardar}
                  onClick={firmaGuardada ? manejarModificar : manejarGuardar}
                  type="button"
                  disabled={botonGuardarDeshabilitado}
                >
                  {firmaGuardada ? textoModificar : textoGuardar}
                </button>
              </div>
            </div>
          </div>

          <div className={estilos.contenedor_consentimiento}>
            <label className={estilos.contenedor_checkbox}>
              <input
                type="checkbox"
                className={estilos.checkbox_nativo}
                checked={aceptoTerminos}
                onChange={e => setAceptoTerminos(e.target.checked)}
                aria-describedby="firma-consentimiento"
              />
              <span className={estilos.checkbox_custom} aria-hidden="true" />
              <span id="firma-consentimiento" className={estilos.texto_consentimiento}>
                {textoConsentimiento}
              </span>
            </label>
          </div>

          {mostrarBotonSubir && (
            <div className={estilos.contenedor_subir}>
              <input
                ref={inputArchivoRef}
                type="file"
                accept="image/*"
                className={estilos.input_archivo}
                onChange={manejarAdjuntarImagen}
                aria-label="Subir imagen de firma"
              />
              <button className={estilos.boton_subir} onClick={manejarClickAdjuntar} type="button">
                <IconUpload className={estilos.icono} aria-hidden="true" />
                {textoAdjuntar}
              </button>
            </div>
          )}
        </div>
      </dialog>
    );
  },
);

FirmaManual.displayName = 'FirmaManual';

export { FirmaManual };
