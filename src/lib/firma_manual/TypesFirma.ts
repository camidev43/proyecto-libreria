export type FirmaManualProps = {
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
  limpiar: () => void;
  obtenerDatosFirma: () => string | null;
  estaVacio: () => boolean;
};
