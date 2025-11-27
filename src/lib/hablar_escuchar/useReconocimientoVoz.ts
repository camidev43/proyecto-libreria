import { useEffect, useRef, useState, useCallback } from 'react';

type SpeechRecognitionEvent = {
  resultIndex: number;
  results: SpeechRecognitionResultList;
} & Event;

type SpeechRecognitionResultList = {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
};

type SpeechRecognitionResult = {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
};

type SpeechRecognitionAlternative = {
  transcript: string;
  confidence: number;
};

type SpeechRecognitionErrorEvent = {
  error: string;
  message: string;
} & Event;

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
} & EventTarget;

type SpeechRecognitionConstructor = {
  new (): SpeechRecognitionInstance;
};

declare global {
  type ExtendedWindow = Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
}

type Props = {
  value: string;
  onChange: (nuevoTexto: string) => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  onDictadoCompleto?: () => void;
  idioma?: string;
};

export function useReconocimientoVoz({
  value,
  onChange,
  isDisabled,
  isReadOnly,
  onDictadoCompleto,
  idioma = 'es-ES',
}: Props) {
  const [hablando, setHablando] = useState(false);
  const [escuchando, setEscuchando] = useState(false);
  const [errorDictado, setErrorDictado] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const puedeHablar = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const puedeEscuchar =
    typeof window !== 'undefined' &&
    !!((window as ExtendedWindow).SpeechRecognition || (window as ExtendedWindow).webkitSpeechRecognition);

  const detenerHablar = useCallback(() => {
    if (puedeHablar) {
      window.speechSynthesis.cancel();
      setHablando(false);
    }
  }, [puedeHablar]);

  const escuchar = useCallback(() => {
    if (!puedeHablar || !value) return;
    detenerHablar();

    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = idioma;
    utterance.onstart = () => setHablando(true);
    utterance.onend = () => setHablando(false);
    utterance.onerror = () => setHablando(false);

    window.speechSynthesis.speak(utterance);
  }, [puedeHablar, value, idioma, detenerHablar]);

  const detenerDictado = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setEscuchando(false);
    }
  }, []);

  const dictar = useCallback(() => {
    if (!puedeEscuchar || isDisabled || isReadOnly) return;

    const SpeechRecognitionCtor =
      (window as ExtendedWindow).SpeechRecognition || (window as ExtendedWindow).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setErrorDictado('Navegador no compatible');
      return;
    }

    try {
      const recognition = new SpeechRecognitionCtor();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = idioma;

      recognition.onstart = () => {
        setEscuchando(true);
        setErrorDictado(null);
      };

      recognition.onend = () => setEscuchando(false);

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setEscuchando(false);
        setErrorDictado('Error al reconocer voz');
        console.error(event.error);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        try {
          const transcript = event.results[0]?.[0]?.transcript;
          if (!transcript) return;

          const nuevoTexto = value ? `${value} ${transcript}` : transcript;
          onChange(nuevoTexto);
          onDictadoCompleto?.();
        } catch (_err) {
          setErrorDictado('Error procesando dictado');
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (_err) {
      setErrorDictado('No se pudo iniciar dictado');
    }
  }, [puedeEscuchar, isDisabled, isReadOnly, value, onChange, idioma, onDictadoCompleto]);

  useEffect(() => {
    return () => {
      if (puedeHablar) window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [puedeHablar]);

  return {
    puedeHablar,
    puedeEscuchar,
    hablando,
    escuchando,
    errorDictado,
    escuchar,
    detenerHablar,
    dictar,
    detenerDictado,
  };
}

export type UseReconocimientoVoz = ReturnType<typeof useReconocimientoVoz>;
