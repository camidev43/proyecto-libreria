import estilos from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={estilos.contenedor_principal}>
      <section className={estilos.seccion_hero}>
        <div className={estilos.columna_texto}>
          <span className={estilos.chip_etiqueta}>Laboratorio interno · PC Soluciones</span>
          <h1 className={estilos.titulo_principal}>
            Componentes React listos para <span className={estilos.texto_resaltado}>probar</span>
          </h1>
          <p className={estilos.parrafo_principal}>
            Esto no es una librería pública, es un <strong>demo/laboratorio</strong> para validar
            patrones de UI: estados, accesibilidad, tema claro/oscuro y tokens de diseño.
          </p>
          <div className={estilos.acciones_hero}>
            <a href='/boton' className={estilos.cta_principal}>
              Explorar Botones
            </a>
            <a href='#arquitectura' className={estilos.cta_secundaria}>
              Arquitectura
            </a>
          </div>
        </div>

        <div className={estilos.columna_visual} aria-hidden>
          <div className={estilos.resplandor_uno} />
          <div className={estilos.resplandor_dos} />
          <div className={estilos.pila_cartas}>
            <div className={estilos.carta_flotante} />
            <div className={estilos.carta_flotante} />
            <div className={estilos.carta_flotante} />
          </div>
        </div>
      </section>

      <section id='arquitectura' className={estilos.seccion_bloque}>
        <h2 className={estilos.titulo_seccion}>Cómo está organizado</h2>

        <div className={estilos.grilla_tres}>
          <article className={estilos.tarjeta_vidrio}>
            <h3 className={estilos.titulo_tarjeta}>Estructura por componente</h3>
            <p className={estilos.texto_suave}>
              Carpetas autocontenidas: UI + estilos + historias + docs + hook de lógica y tests.
            </p>
            <pre className={estilos.bloque_codigo}>
              {`Componente/
├─ Componente.tsx          # forwardRef + props tipadas
├─ Componente.module.css   # CSS Modules
├─ Componente.stories.tsx  # Storybook
├─ Componente.mdx          # Docs
├─ useLogic.ts             # Lógica y estados
├─ useLogic.spec.ts        # Tests del hook
└─ index.ts                # Barrel export`}
            </pre>
          </article>

          <article className={estilos.tarjeta_vidrio}>
            <h3 className={estilos.titulo_tarjeta}>Flujo de trabajo</h3>
            <ul className={estilos.lista_detallada}>
              <li>
                <code>pnpm dev</code> — servidor para el laboratorio
              </li>
              <li>
                <code>pnpm start:docs</code> — Storybook
              </li>
              <li>
                <code>pnpm test</code> — pruebas con Vitest
              </li>
              <li>
                <code>pnpm build</code> — empaquetado ESM+d.ts
              </li>
            </ul>
            <p className={estilos.texto_suave}>
              Linting con ESLint/Prettier/Stylelint. Estilos modernos con{' '}
              <em>postcss-preset-env</em>.
            </p>
          </article>

          <article className={estilos.tarjeta_vidrio}>
            <h3 className={estilos.titulo_tarjeta}>Principios</h3>
            <ul className={estilos.lista_detallada}>
              <li>Accesibilidad por defecto (roles, aria-*, foco visible).</li>
              <li>Tokens de diseño y tema claro/oscuro nativo.</li>
              <li>Separación de lógica en hooks reutilizables.</li>
              <li>Props con uniones: variantes, tamaños, estados.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={estilos.seccion_bloque}>
        <h2 className={estilos.titulo_seccion}>Accesos rápidos</h2>
        <div className={estilos.grilla_cuatro}>
          <a className={estilos.acceso_tile} href='/boton'>
            <span className={estilos.tile_titulo}>Botones</span>
            <span className={estilos.tile_descripcion}>Variantes, tamaños y estados</span>
          </a>
          <div className={estilos.acceso_tile_muted}>
            <span className={estilos.tile_titulo}>Próximamente</span>
            <span className={estilos.tile_descripcion}>Alertas, tarjetas, tablas…</span>
          </div>
          <div className={estilos.acceso_tile_muted}>
            <span className={estilos.tile_titulo}>Guía de estilos</span>
            <span className={estilos.tile_descripcion}>Tipografía, espacios, grid</span>
          </div>
          <div className={estilos.acceso_tile_muted}>
            <span className={estilos.tile_titulo}>Pruebas visuales</span>
            <span className={estilos.tile_descripcion}>Snapshots y regresiones</span>
          </div>
        </div>
      </section>
    </div>
  );
}
