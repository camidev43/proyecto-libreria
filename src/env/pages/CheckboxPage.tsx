import clsx from 'clsx';
import { useState } from 'react';

import estilos from './CheckboxPage.module.css';
import Checkbox from '../../lib/checkbox';

const OPTIONS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

const PLANES = [
  { value: 'free', label: 'Gratis', price: '$0' },
  { value: 'pro', label: 'Pro', price: '$12' },
  { value: 'enterprise', label: 'Enterprise', price: '$49' },
  { value: 'custom', label: 'Personalizado', price: 'Consultar' },
];

export const CheckboxPage = () => {
  const [simple, setSimple] = useState(false);
  const [frameworks, setFrameworks] = useState<string[]>(['react']);
  const [horizontal, setHorizontal] = useState<string[]>(['vue']);
  const [limited, setLimited] = useState<string[]>([]);
  const [custom, setCustom] = useState<string[]>(['pro']);

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contenido}>
        <h1 className={estilos.titulo}>Controles: Checkbox</h1>

        <h2 className={estilos['section-title']}>1. Básico y Estados</h2>
        <section className={estilos.grid}>
          <div className={estilos.card}>
            <h3>Simple (Contenedor)</h3>
            <div className={estilos.row}>
              <Checkbox.Contenedor>
                <input
                  type='checkbox'
                  checked={simple}
                  onChange={e => setSimple(e.target.checked)}
                  aria-label='Aceptar términos'
                />
              </Checkbox.Contenedor>
              <span>Acepto los términos ({simple ? 'Sí' : 'No'})</span>
            </div>
          </div>

          <div className={estilos.card}>
            <h3>Estados</h3>
            <div className={estilos.grid} style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Checkbox.Grupo
                label='Deshabilitado'
                disabled
                valores={['opt1']}
                options={[
                  { value: 'opt1', label: 'Opción 1' },
                  { value: 'opt2', label: 'Opción 2' },
                ]}
              />
              <Checkbox.Grupo
                label='Solo Lectura'
                readOnly
                valores={['opt2']}
                options={[
                  { value: 'opt1', label: 'Opción 1' },
                  { value: 'opt2', label: 'Opción 2' },
                ]}
              />
            </div>
          </div>
        </section>

        <h2 className={estilos['section-title']} style={{ marginTop: '2rem' }}>
          2. Grupos y Validaciones
        </h2>
        <section className={estilos.grid}>
          <div className={estilos.card}>
            <h3>Vertical (Default)</h3>
            <Checkbox.Grupo
              valores={frameworks}
              onChange={setFrameworks}
              options={OPTIONS}
              label='Selecciona tus favoritos'
            />
          </div>

          <div className={estilos.card}>
            <h3>Horizontal + Required</h3>
            <Checkbox.Grupo
              orientation='horizontal'
              valores={horizontal}
              onChange={setHorizontal}
              options={OPTIONS.slice(0, 3)}
              label='Framework Principal'
              required
              requiredConAsterisco
            />
          </div>

          <div className={estilos.card}>
            <h3>Límite de Selección (Max 2)</h3>
            <Checkbox.Grupo
              valores={limited}
              onChange={setLimited}
              options={OPTIONS}
              maxSelecionados={2}
              label='Elige máximo 2'
            />
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              Seleccionados: {limited.join(', ')}
            </div>
          </div>
        </section>

        <h2 className={estilos['section-title']} style={{ marginTop: '2rem' }}>
          3. Estilos y Variantes
        </h2>
        <section className={estilos.grid}>
          <div className={estilos.card}>
            <h3>Colores y Tamaños</h3>
            <div className={estilos.row} style={{ flexWrap: 'wrap' }}>
              <Checkbox.Grupo
                valores={['1']}
                options={[{ value: '1', label: 'Small' }]}
                size='16px'
                color='var(--brand-primary)'
              />
              <Checkbox.Grupo
                valores={['1']}
                options={[{ value: '1', label: 'Medium' }]}
                size='20px'
                color='var(--brand-secondary)'
              />
              <Checkbox.Grupo
                valores={['1']}
                options={[{ value: '1', label: 'Large' }]}
                size='24px'
                color='var(--brand-tertiary)'
              />
            </div>
          </div>

          <div className={estilos.card}>
            <h3>Variantes Visuales</h3>
            <div className={estilos.grid} style={{ gap: '2rem' }}>
              <Checkbox.Grupo
                label='Sin Relleno (Outline)'
                relleno={false}
                valores={['a', 'b']}
                options={[
                  { value: 'a', label: 'Opción A' },
                  { value: 'b', label: 'Opción B' },
                ]}
              />
              <Checkbox.Grupo
                label='Tachado al marcar'
                tachado
                valores={['done']}
                options={[
                  { value: 'todo', label: 'Por hacer' },
                  { value: 'done', label: 'Completado' },
                ]}
              />
            </div>
          </div>
        </section>

        <h2 className={estilos['section-title']} style={{ marginTop: '2rem' }}>
          4. Personalización Avanzada (Render Prop)
        </h2>
        <div className={estilos.card}>
          <h3>Selección de Planes (Grid Layout)</h3>
          <p>
            Usa <code>Checkbox.Personalizado</code> para control total del renderizado.
          </p>

          <div className={estilos['custom-grid']}>
            <Checkbox.Personalizado opciones={PLANES} valoresIniciales={custom} onChange={setCustom}>
              {(plan, { checked, alternar, disabled }) => (
                <div
                  className={clsx(estilos['custom-card'], checked && estilos['custom-card-selected'])}
                  onClick={!disabled ? alternar : undefined}
                  role='checkbox'
                  aria-checked={checked}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      alternar();
                    }
                  }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{checked ? '✅' : '⚪'}</div>
                  <strong style={{ fontSize: '1.1rem' }}>{plan.label}</strong>
                  <span className={estilos.badge} style={{ marginTop: '0.5rem' }}>
                    {plan.price}
                  </span>
                </div>
              )}
            </Checkbox.Personalizado>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxPage;
