import { useRef, useState, useCallback } from 'react';

/** A point in the canvas coordinate system */
type Punto = {
  x: number;
  y: number;
};

/** Stroke history type */
type Trazo = {
  puntos: Punto[];
  color: string;
};

/**
 * useFirmaLogica
 * Hook that encapsulates the canvas drawing logic for FirmaManual.
 * Returns references and actions to integrate a canvas-based signature capture.
 *
 * Returned values:
 * - canvasRef: ref for the canvas element
 * - estaVacio: boolean indicating whether the canvas is empty
 * - limpiarCanvas: function to clear the canvas
 * - deshacerUltimoTrazo: undo last stroke
 * - puedeDeshacer: boolean if undo is possible
 * - obtenerDatosFirma: export canvas as PNG data URL
 * - configurarCanvas: attach event listeners and configure stroke style
 */
const useFirmaLogica = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDibujando, setIsDibujando] = useState(false);
  const [estaVacio, setEstaVacio] = useState(true);
  const [ultimoPunto, setUltimoPunto] = useState<Punto | null>(null);
  // Removed unused UI states (tabs, text overlay, color) to keep the hook lean and focused
  const [trazos, setTrazos] = useState<Trazo[]>([]);
  const [trazoActual, setTrazoActual] = useState<Punto[]>([]);

  const limpiarCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setEstaVacio(true);
      setTrazos([]);
      setTrazoActual([]);
    }
  }, []);

  const deshacerUltimoTrazo = useCallback(() => {
    if (trazos.length === 0) return;

    const nuevosTrazos = trazos.slice(0, -1);
    setTrazos(nuevosTrazos);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nuevosTrazos.forEach(trazo => {
      if (trazo.puntos.length < 2) return;

      ctx.strokeStyle = trazo.color;
      ctx.beginPath();
      ctx.moveTo(trazo.puntos[0].x, trazo.puntos[0].y);

      for (let i = 1; i < trazo.puntos.length; i++) {
        ctx.lineTo(trazo.puntos[i].x, trazo.puntos[i].y);
      }
      ctx.stroke();
    });

    setEstaVacio(nuevosTrazos.length === 0);
  }, [trazos]);

  /** Convert a mouse or touch event to canvas coordinates, accounting for device pixel ratio */
  const obtenerPuntoDeEvento = useCallback((event: MouseEvent | TouchEvent): Punto => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    // El canvas tiene el doble de tamaño interno (HD), escala correcta
    const escalaX = canvas.width / rect.width;
    const escalaY = canvas.height / rect.height;

    if ('touches' in event) {
      return {
        x: (event.touches[0].clientX - rect.left) * escalaX,
        y: (event.touches[0].clientY - rect.top) * escalaY,
      };
    } else {
      return {
        x: (event.clientX - rect.left) * escalaX,
        y: (event.clientY - rect.top) * escalaY,
      };
    }
  }, []);

  const dibujarLinea = useCallback((inicio: Punto, fin: Punto) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(inicio.x, inicio.y);
    ctx.lineTo(fin.x, fin.y);
    ctx.stroke();
    setEstaVacio(false);
  }, []);

  /** Start a new stroke and record the first point */
  const iniciarDibujo = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      const punto = obtenerPuntoDeEvento(event);
      setIsDibujando(true);
      setUltimoPunto(punto);
      setTrazoActual([punto]);
    },
    [obtenerPuntoDeEvento]
  );

  /** Continue the current stroke while pointer moves */
  const dibujar = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDibujando || !ultimoPunto) return;
      event.preventDefault();

      const puntoActual = obtenerPuntoDeEvento(event);
      dibujarLinea(ultimoPunto, puntoActual);
      setUltimoPunto(puntoActual);
      setTrazoActual(prev => [...prev, puntoActual]);
    },
    [isDibujando, ultimoPunto, obtenerPuntoDeEvento, dibujarLinea]
  );

  /** Finish the current stroke and save it to history */
  const detenerDibujo = useCallback(() => {
    if (isDibujando && trazoActual.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const nuevoTrazo: Trazo = {
        puntos: trazoActual,
        color: (ctx?.strokeStyle as string) || '#000000',
      };
      setTrazos(prev => [...prev, nuevoTrazo]);
      setTrazoActual([]);
    }
    setIsDibujando(false);
    setUltimoPunto(null);
  }, [isDibujando, trazoActual]);

  const obtenerDatosFirma = useCallback((): string | null => {
    const canvas = canvasRef.current;
    if (!canvas || estaVacio) return null;
    return canvas.toDataURL('image/png');
  }, [estaVacio]);

  /** Configure canvas context options and attach pointer/touch events for drawing.
   * Returns a cleanup function to remove event listeners when unmounting.
   */
  const configurarCanvas = useCallback(
    (color: string, habilitado = true) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      // Configurar el contexto de dibujo para HD (sin escalar el ctx, el canvas ya tiene width/height * 2)
      ctx.strokeStyle = color;
      ctx.lineWidth = 4; // Más grueso porque el canvas es 2x
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (!habilitado) {
        return () => {};
      }

      // Eventos del mouse
      canvas.addEventListener('mousedown', iniciarDibujo);
      canvas.addEventListener('mousemove', dibujar);
      canvas.addEventListener('mouseup', detenerDibujo);
      canvas.addEventListener('mouseout', detenerDibujo);

      // Eventos táctiles
      canvas.addEventListener('touchstart', iniciarDibujo);
      canvas.addEventListener('touchmove', dibujar);
      canvas.addEventListener('touchend', detenerDibujo);

      return () => {
        canvas.removeEventListener('mousedown', iniciarDibujo);
        canvas.removeEventListener('mousemove', dibujar);
        canvas.removeEventListener('mouseup', detenerDibujo);
        canvas.removeEventListener('mouseout', detenerDibujo);
        canvas.removeEventListener('touchstart', iniciarDibujo);
        canvas.removeEventListener('touchmove', dibujar);
        canvas.removeEventListener('touchend', detenerDibujo);
      };
    },
    [iniciarDibujo, dibujar, detenerDibujo]
  );

  return {
    canvasRef,
    estaVacio,
    limpiarCanvas,
    deshacerUltimoTrazo,
    puedeDeshacer: trazos.length > 0,
    obtenerDatosFirma,
    configurarCanvas,
  };
};

export default useFirmaLogica;
