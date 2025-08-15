import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Tema = 'light' | 'dark';

type EstadoTema = {
  tema: Tema;
  alternarTema: () => void;
  establecerTema: (t: Tema) => void;
};

const CLAVE_TEMA_ALMACENADA = 'tema-preferido';

const DURACION_TRANSICION_MS = 600;

let ultimaX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
let ultimaY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

let esPrimeraAplicacion = true;

let transicionActiva: ViewTransition | null = null;
let animacionOndaActual: Animation | null = null;

const prefiereReducirMovimiento = (): boolean => {
  try {
    return !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

const sistemaPrefiereOscuro = (): boolean => {
  try {
    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
};

const hayTransicionesDeVista = (): boolean =>
  typeof document !== 'undefined' && typeof document.startViewTransition === 'function';

if (typeof document !== 'undefined') {
  document.addEventListener(
    'pointerdown',
    e => {
      const pe = e as PointerEvent;
      ultimaX = pe.clientX;
      ultimaY = pe.clientY;
    },
    { capture: true }
  );
}

export const registrarCoordenadasFallbackDesdeElemento = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  ultimaX = r.left + r.width / 2;
  ultimaY = r.top + r.height / 2;
};

const aplicarTema = (tema: Tema, opciones?: { instantaneo?: boolean; x?: number; y?: number }) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const temaActual = root.getAttribute('data-theme');

  const debeSerInstantaneo =
    opciones?.instantaneo ||
    esPrimeraAplicacion ||
    temaActual === tema ||
    prefiereReducirMovimiento() ||
    !hayTransicionesDeVista();

  if (debeSerInstantaneo) {
    animacionOndaActual?.cancel();
    root.setAttribute('data-theme', tema);
    esPrimeraAplicacion = false;
    return;
  }

  if (transicionActiva) {
    animacionOndaActual?.cancel();
    root.setAttribute('data-theme', tema);
    return;
  }

  const x = opciones?.x ?? ultimaX;
  const y = opciones?.y ?? ultimaY;

  transicionActiva = document.startViewTransition!(() => {
    root.setAttribute('data-theme', tema);
  });

  transicionActiva.ready
    .then(() => {
      animacionOndaActual = root.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(150% at ${x}px ${y}px)` },
        ],
        {
          duration: DURACION_TRANSICION_MS,
          easing: 'ease-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
      return animacionOndaActual.finished;
    })
    .catch(() => {
      root.setAttribute('data-theme', tema);
    })
    .finally(() => {
      animacionOndaActual = null;
      transicionActiva = null;
    });
};

const resolverTemaInicial = (): Tema => {
  try {
    const guardado = localStorage.getItem(CLAVE_TEMA_ALMACENADA);
    if (guardado === 'light' || guardado === 'dark') return guardado;
  } catch {
    /* no-op */
  }
  return sistemaPrefiereOscuro() ? 'dark' : 'light';
};

const TEMA_INICIAL: Tema = resolverTemaInicial();

export const useTemaStore = create<EstadoTema>()(
  persist(
    (set, get) => ({
      tema: TEMA_INICIAL,
      alternarTema: () => {
        const siguiente: Tema = get().tema === 'light' ? 'dark' : 'light';
        set({ tema: siguiente });
      },
      establecerTema: (t: Tema) => set({ tema: t }),
    }),
    {
      name: CLAVE_TEMA_ALMACENADA,
      storage: createJSONStorage(() => localStorage),
      partialize: s => ({ tema: s.tema }),
      onRehydrateStorage: () => (state, error) => {
        if (error || !state) return;
        aplicarTema(state.tema, { instantaneo: true });
      },
    }
  )
);

if (typeof document !== 'undefined') {
  aplicarTema(useTemaStore.getState().tema, { instantaneo: true });

  useTemaStore.subscribe(s => aplicarTema(s.tema));
}
