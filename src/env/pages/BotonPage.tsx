import { useMemo, useState, type CSSProperties } from 'react';

import estilos from './BotonPage.module.css';
import { Boton } from '../../lib';
import type { Variant, Color, Size, Radius } from '../../lib/Boton/Boton';

const VARIANTS: Variant[] = ['solid', 'bordered', 'light', 'faded', 'ghost', 'shadow'];
const COLORES: Color[] = ['primary', 'secondary', 'success', 'warning', 'danger', 'default'];
const TAMANOS: Size[] = ['sm', 'md', 'lg'];
const RADIOS: Radius[] = ['none', 'sm', 'md', 'lg', 'full'];

export function BotonPage() {
    const [variant, setVariant] = useState<Variant>('solid');
    const [color, setColor] = useState<Color>('primary');
    const [size, setSize] = useState<Size>('md');
    const [radius, setRadius] = useState<Radius>('md');
    const [fullWidth, setFull] = useState(false);
    const [isLoading, setLoad] = useState(false);
    const [isDisabled, setDis] = useState(false);
    const [isIconOnly, setIcon] = useState(false);

    const label = isIconOnly ? '★' : 'Ejecutar acción';

    const snippet = useMemo(() => {
        const p = [`variant="${variant}"`, `color="${color}"`, `size="${size}"`, `radius="${radius}"`];
        if (fullWidth) p.push('fullWidth');
        if (isLoading) p.push('isLoading');
        if (isDisabled) p.push('isDisabled');
        if (isIconOnly) p.push('isIconOnly');
        return `<Boton ${p.join(' ')}>${isIconOnly ? '★' : 'Acción'}</Boton>`;
    }, [variant, color, size, radius, fullWidth, isLoading, isDisabled, isIconOnly]);

    return (
        <div className={estilos.contenedor_boton_page}>
            {/* HERO */}
            <section className={estilos.seccion_hero}>
                <div className={estilos.hero_textos}>
                    <span className={estilos.hero_chip}>Laboratorio</span>
                    <h1 className={estilos.hero_titulo}>Botones</h1>
                    <p className={estilos.hero_parrafo}>
                        Playground visual con chips, colecciones rápidas en cinta y estados presentados en paneles
                        elevados. Sombras suaves, sin bordes.
                    </p>
                </div>

                <div className={estilos.hero_visual} aria-hidden>
                    <div className={estilos.hero_glow_1} />
                    <div className={estilos.hero_glow_2} />
                    <div className={estilos.hero_pod}>
                        <Boton variant='shadow' color='success' className={estilos.hero_boton}>
                            ✔
                        </Boton>
                    </div>
                </div>
            </section>

            {/* PLAYGROUND */}
            <section className={estilos.seccion}>
                <div className={estilos.encabezado_seccion}>
                    <h2 className={estilos.titulo_seccion}>Playground</h2>
                    <p className={estilos.descripcion_seccion}>Toca los chips y mira el resultado en vivo.</p>
                </div>

                <div className={estilos.playground}>
                    <div className={estilos.controles}>
                        <div className={estilos.grupo}>
                            <span className={estilos.grupo_titulo}>Variante</span>
                            <div className={estilos.chips}>
                                {VARIANTS.map(v => (
                                    <button
                                        key={v}
                                        className={`${estilos.chip} ${variant === v ? estilos.chip_activo : ''}`}
                                        onClick={() => setVariant(v)}>
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={estilos.grupo}>
                            <span className={estilos.grupo_titulo}>Color</span>
                            <div className={estilos.chips}>
                                {COLORES.map(c => (
                                    <button
                                        key={c}
                                        className={`${estilos.chip} ${color === c ? estilos.chip_activo : ''}`}
                                        onClick={() => setColor(c)}>
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={estilos.grupo_fila}>
                            <div className={estilos.grupo}>
                                <span className={estilos.grupo_titulo}>Tamaño</span>
                                <div className={estilos.chips}>
                                    {TAMANOS.map(s => (
                                        <button
                                            key={s}
                                            className={`${estilos.chip} ${size === s ? estilos.chip_activo : ''}`}
                                            onClick={() => setSize(s)}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={estilos.grupo}>
                                <span className={estilos.grupo_titulo}>Radio</span>
                                <div className={estilos.chips}>
                                    {RADIOS.map(r => (
                                        <button
                                            key={r}
                                            className={`${estilos.chip} ${radius === r ? estilos.chip_activo : ''}`}
                                            onClick={() => setRadius(r)}>
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={estilos.switches}>
                            <label>
                                <input type='checkbox' checked={fullWidth} onChange={e => setFull(e.target.checked)} />{' '}
                                fullWidth
                            </label>
                            <label>
                                <input type='checkbox' checked={isLoading} onChange={e => setLoad(e.target.checked)} />{' '}
                                isLoading
                            </label>
                            <label>
                                <input type='checkbox' checked={isDisabled} onChange={e => setDis(e.target.checked)} />{' '}
                                isDisabled
                            </label>
                            <label>
                                <input type='checkbox' checked={isIconOnly} onChange={e => setIcon(e.target.checked)} />{' '}
                                isIconOnly
                            </label>
                        </div>
                    </div>

                    <div className={estilos.vista}>
                        <div className={estilos.stage}>
                            <Boton
                                variant={variant}
                                color={color}
                                size={size}
                                radius={radius}
                                fullWidth={fullWidth}
                                isLoading={isLoading}
                                isDisabled={isDisabled}
                                isIconOnly={isIconOnly}>
                                {label}
                            </Boton>
                        </div>
                        <pre className={estilos.snippet}>{snippet}</pre>
                    </div>
                </div>
            </section>

            {/* COLECCIONES RÁPIDAS — Cinta scroll-snap */}
            <section className={estilos.seccion}>
                <div className={estilos.encabezado_seccion}>
                    <h2 className={estilos.titulo_seccion}>Colecciones rápidas</h2>
                    <p className={estilos.descripcion_seccion}>
                        Desliza horizontalmente. Cada tarjeta es un preset listo para copiar.
                    </p>
                </div>

                <div className={estilos.cinta_scroll} role='list'>
                    {VARIANTS.map((v, i) => (
                        <article
                            role='listitem'
                            key={v}
                            className={estilos.cinta_item}
                            style={{ '--delay': `${i * 0.05}s` } as CSSProperties}>
                            <div className={estilos.cinta_preview}>
                                <Boton variant={v} color='primary'>
                                    {v}
                                </Boton>
                            </div>
                            <div className={estilos.cinta_textos}>
                                <strong className={estilos.cinta_titulo}>{v}</strong>
                                <code className={estilos.cinta_badge}>variant=&quot;{v}&quot;</code>
                            </div>
                        </article>
                    ))}

                    {COLORES.map((c, i) => (
                        <article
                            role='listitem'
                            key={c}
                            className={estilos.cinta_item}
                            style={{ '--delay': `${(i + 6) * 0.05}s` } as CSSProperties}>
                            <div className={estilos.cinta_preview}>
                                <Boton variant='solid' color={c}>
                                    {c}
                                </Boton>
                            </div>
                            <div className={estilos.cinta_textos}>
                                <strong className={estilos.cinta_titulo}>{c}</strong>
                                <code className={estilos.cinta_badge}>color=&quot;{c}&quot;</code>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* ESTADOS COMUNES — Paneles elevados bonitos */}
            <section className={estilos.seccion}>
                <div className={estilos.encabezado_seccion}>
                    <h2 className={estilos.titulo_seccion}>Estados comunes</h2>
                    <p className={estilos.descripcion_seccion}>Paneles con halo y elevación (sin bordes).</p>
                </div>

                <div className={estilos.estados_grid}>
                    <div className={estilos.estado_panel}>
                        <div className={estilos.estado_header}>Normal</div>
                        <div className={estilos.estado_fila}>
                            <Boton variant='solid' color='primary'>
                                Guardar
                            </Boton>
                            <Boton variant='bordered' color='secondary'>
                                Cancelar
                            </Boton>
                        </div>
                    </div>

                    <div className={estilos.estado_panel}>
                        <div className={estilos.estado_header}>Deshabilitado</div>
                        <div className={estilos.estado_fila}>
                            <Boton variant='solid' color='primary' isDisabled>
                                Guardar
                            </Boton>
                            <Boton variant='bordered' color='secondary' isDisabled>
                                Cancelar
                            </Boton>
                        </div>
                    </div>

                    <div className={estilos.estado_panel}>
                        <div className={estilos.estado_header}>Cargando</div>
                        <div className={estilos.estado_fila}>
                            <Boton variant='solid' color='primary' isLoading>
                                Procesando…
                            </Boton>
                            <Boton variant='bordered' color='primary' isLoading>
                                Enviando…
                            </Boton>
                        </div>
                    </div>

                    <div className={estilos.estado_panel}>
                        <div className={estilos.estado_header}>Icon-only / Full width</div>
                        <div className={estilos.estado_fila}>
                            <Boton variant='ghost' color='primary' isIconOnly aria-label='Favorito'>
                                ★
                            </Boton>
                            <Boton variant='shadow' color='success' fullWidth>
                                Acción de ancho completo
                            </Boton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
