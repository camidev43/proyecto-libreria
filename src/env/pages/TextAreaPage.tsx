import { useState } from 'react';
import type React from 'react';

import TextArea from '@/lib/TextArea/TextArea';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ display: 'grid', gap: '0.75rem' }}>
    <h3 style={{ margin: 0, fontWeight: 900, letterSpacing: '0.01em' }}>{title}</h3>
    <div style={{ display: 'grid', gap: '0.75rem' }}>{children}</div>
  </section>
);

const Grid = ({ children, min = 320 }: { children: React.ReactNode; min?: number }) => (
  <div
    style={{
      display: 'grid',
      gap: '1rem',
      gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
      alignItems: 'start',
    }}>
    {children}
  </div>
);

const TextAreaPage = () => {
  const [valorCtrl, setValorCtrl] = useState('');
  const [valorCtrlNativo, setValorCtrlNativo] = useState('Con validación nativa');

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <Section title='Básico'>
        <Grid>
          <TextArea label='Descripción' placeholder='Escribe algo…' description='Autosize 3–8 por defecto.' />
          <TextArea label='disableAutosize' disableAutosize placeholder='Con asa de redimensión' />
          <TextArea label='rows=6' disableAutosize rows={6} placeholder='6 filas fijas' />
        </Grid>
      </Section>

      <Grid>
        <Section title='Variantes'>
          <Grid min={300}>
            <TextArea label='Flat deshabilitado' variant='flat' isDisabled value='Camilo Andres zarta perez' />
            <TextArea label='Normal' variant='normal' placeholder='Fondo normal' />
            <TextArea label='Light' variant='light' placeholder='Fondo plano' />
            <TextArea label='Flat' variant='flat' placeholder='Fondo simple' />
            <TextArea label='Bordered' variant='bordered' placeholder='Borde sólido' />
            <TextArea label='Faded' variant='faded' placeholder='Fondo desvanecido' />
            <TextArea label='Underlined' variant='underlined' placeholder='Solo subrayado' />
          </Grid>
        </Section>

        <Section title='Colores'>
          <Grid min={300}>
            {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map(c => (
              <TextArea key={c} label={`Color ${c}`} color={c} placeholder={`Color ${c}`} />
            ))}
          </Grid>
        </Section>

        <Section title='Tamaños y radios'>
          <Grid min={300}>
            <TextArea label='sm + sm' size='sm' radius='sm' placeholder='sm…' />
            <TextArea label='md + md' size='md' radius='md' placeholder='md…' />
            <TextArea label='lg + lg' size='lg' radius='lg' placeholder='lg…' />
            <TextArea label='Sin radio' size='md' radius='none' placeholder='sin border-radius' />
          </Grid>
        </Section>
      </Grid>

      <Grid>
        <Section title='Colocación del label'>
          <Grid min={300}>
            <TextArea label='Inside (fijo)' labelPlacement='inside' placeholder='El label no se mueve' />
            <TextArea label='Outside' labelPlacement='outside' isClearable placeholder='Con botón limpiar' />
            <TextArea label='Outside' labelPlacement='outside' isClearable placeholder='Con botón limpiar' />

            <div style={{ maxWidth: 380 }}>
              <TextArea label='No fullWidth' fullWidth={false} placeholder='Ancho contenido' />
            </div>
          </Grid>
        </Section>

        <Section title='Estados & validación'>
          <Grid min={300}>
            <TextArea label='Requerido' isRequired placeholder='*' />
            <TextArea label='Solo lectura' isReadOnly defaultValue='No editable' />
            <TextArea
              label='Controlado + validación (ARIA)'
              value={valorCtrl}
              onChange={setValorCtrl}
              validate={v => (v && v.length < 8 ? 'Mínimo 8 caracteres.' : true)}
              errorMessage={r => (r.invalido ? r.mensaje : null)}
              isClearable
              placeholder='Validación simple…'
            />
            <TextArea
              label='Validación nativa'
              value={valorCtrlNativo}
              onChange={setValorCtrlNativo}
              isRequired
              errorMessage='Campo requerido'
              placeholder='Requiere contenido'
            />
          </Grid>
        </Section>
      </Grid>

      <Grid>
        <Section title='Contenido & utilidades'>
          <Grid min={300}>
            <TextArea label='Con adornos' endContent={<span>↵</span>} placeholder='Iconos a los lados' />
            <TextArea
              label='Con ayuda'
              description='Pequeña descripción del campo.'
              errorMessage='Ejemplo de error (forzado)'
              isInvalid
              placeholder='Muestra description y error'
            />
            <TextArea label='Clearable + TTS' isClearable placeholder='Escribe algo y prueba los botones…' />
            <TextArea label='Autosize limitado' minRows={1} maxRows={4} placeholder='Crece hasta 4 filas.' />
          </Grid>
        </Section>
      </Grid>
    </div>
  );
};

export default TextAreaPage;
