import { useState } from 'react';

import { FirmaManual } from '@/lib';

import estilos from './FirmaManualPage.module.css';

export const FirmaManualPage = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [firmaGuardada, setFirmaGuardada] = useState<string | null>(null);

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contenido}>
        <header className={estilos.encabezado}>
          <h1 className={estilos.titulo}>Firma Digital</h1>
          <p className={estilos.descripcion}>Captura tu firma de forma elegante y profesional</p>
        </header>

        <button onClick={() => setModalAbierto(true)} className={estilos.boton_principal} type='button'>
          <span className={estilos.icono}>✍️</span>
          <span>Crear Firma</span>
        </button>

        {firmaGuardada && (
          <div className={estilos.card_firma}>
            <h2 className={estilos.subtitulo}>Firma Guardada</h2>
            <div className={estilos.contenedor_imagen}>
              <img src={firmaGuardada} alt='Firma capturada' className={estilos.imagen} />
            </div>
            <button onClick={() => setFirmaGuardada(null)} className={estilos.boton_secundario} type='button'>
              Crear Nueva Firma
            </button>
          </div>
        )}

        <FirmaManual
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onConfirm={setFirmaGuardada}
          cerrarAlGuardar
        />
      </div>
    </div>
  );
};

export default FirmaManualPage;
