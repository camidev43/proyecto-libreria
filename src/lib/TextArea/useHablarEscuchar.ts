import { useEffect, useRef, useState } from 'react';

type _SpeechRecognitionResult = {
  isFinal: boolean;
  0: { transcript: string };
};
type _SpeechRecognitionEvent = {
  resultIndex: number;
  results: _SpeechRecognitionResult[];
};
type _SpeechRecognitionErrorEvent = { error: string };

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    webkitSpeechRecognition?: unknown;
    SpeechRecognition?: unknown;
  }
}

export type OpcionesHablarEscuchar = {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  value: string;
  onChange?: (texto: string) => void;
  redimensionar?: () => void;
  idioma?: string; // por defecto "es-ES"
};

export type RetornoHablarEscuchar = {
  puedeHablar: boolean;
  hablando: boolean;
  escuchar: () => void;
  detenerHablar: () => void;
  puedeEscuchar: boolean;
  escuchando: boolean;
  errorDictado: string | null;
  dictar: () => void;
  detenerDictado: () => void;
  detenerTodo: () => void;
};

export function useHablarEscuchar({
  isDisabled,
  isReadOnly,
  value,
  onChange,
  redimensionar,
  idioma = 'es-ES',
}: OpcionesHablarEscuchar): RetornoHablarEscuchar {
  const [hablando, setHablando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [errorDictado, setErrorDictado] = useState<string | null>(null);

  const recRef = useRef<{ stop?: () => void } | null>(null);
  const escuchandoRef = useRef(false);
  const hablandoRef = useRef(false);

  useEffect(() => {
    escuchandoRef.current = escuchando;
  }, [escuchando]);
  useEffect(() => {
    hablandoRef.current = hablando;
  }, [hablando]);

  const puedeHablar = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const puedeEscuchar =
    typeof window !== 'undefined' &&
    (!!window.SpeechRecognition || !!window.webkitSpeechRecognition);

  const detenerHablar = () => {
    if (!puedeHablar) return;
    window.speechSynthesis.cancel();
    setHablando(false);
  };

  const escuchar = () => {
    if (!puedeHablar || !value || escuchandoRef.current) return;
    if (recRef.current && typeof recRef.current.stop === 'function') {
      try {
        (recRef.current as { stop: () => void }).stop();
      } catch (_e) {
        // Ignorar error
      }
    }
    window.speechSynthesis.cancel();
    const u = new window.SpeechSynthesisUtterance(value);
    u.lang = idioma;
    u.onstart = () => setHablando(true);
    u.onend = () => setHablando(false);
    window.speechSynthesis.speak(u);
  };

  const detenerDictado = () => {
    const rec = recRef.current;
    if (rec && typeof rec.stop === 'function') {
      try {
        (rec as { stop: () => void }).stop();
      } catch (_e) {
        // Ignorar
      }
    }
  };

  const dictar = () => {
    if (!puedeEscuchar || isDisabled || isReadOnly || hablandoRef.current) {
      setErrorDictado('Dictado no disponible o está reproduciendo audio.');
      return;
    }
    if (escuchando && recRef.current && typeof recRef.current.stop === 'function') {
      try {
        (recRef.current as { stop: () => void }).stop();
      } catch (_e) {
        // Ignorar
      }
      return;
    }

    const Ctor = (window.SpeechRecognition || window.webkitSpeechRecognition) as
      | { new (): unknown }
      | undefined;
    if (!Ctor) {
      setErrorDictado('No se pudo iniciar el reconocimiento de voz.');
      return;
    }

    const rec = new Ctor() as {
      lang: string;
      interimResults: boolean;
      continuous: boolean;
      maxAlternatives: number;
      onresult: (ev: _SpeechRecognitionEvent) => void;
      onerror: (ev: _SpeechRecognitionErrorEvent) => void;
      onend: () => void;
      start: () => void;
      stop?: () => void;
    };
    recRef.current = rec;

    rec.lang = idioma;
    rec.interimResults = true;
    rec.continuous = true;
    rec.maxAlternatives = 1;

    let bufferFinal = '';
    rec.onresult = (ev: _SpeechRecognitionEvent) => {
      let interim = '';
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const res = ev.results[i];
        if (res.isFinal) bufferFinal += res[0].transcript;
        else interim += res[0].transcript;
      }
      const texto = (bufferFinal + interim).trim();
      onChange?.(texto);
      redimensionar?.();
    };

    rec.onerror = (_e: _SpeechRecognitionErrorEvent) => {
      setEscuchando(false);
      setErrorDictado(_e?.error ?? 'error');
    };

    rec.onend = () => setEscuchando(false);

    setErrorDictado(null);
    setEscuchando(true);
    try {
      rec.start();
    } catch (_e) {
      // Ignorar
    }
  };

  const detenerTodo = () => {
    detenerDictado();
    detenerHablar();
  };

  useEffect(() => {
    return () => detenerTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    puedeHablar,
    hablando,
    escuchar,
    detenerHablar,
    puedeEscuchar,
    escuchando,
    errorDictado,
    dictar,
    detenerDictado,
    detenerTodo,
  };
}
