import type { ReactNode, CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';

import BotonTema from './BotonTema';
import estilos from './Layout.module.css';

export default function Layout({ children }: { children: ReactNode }) {
    const location = useLocation();

    const elementos_menu = [
        {
            path: '/',
            icono: '🧪',
            etiqueta: 'Laboratorio',
            descripcion: 'Demo de componentes',
            color: 'var(--brand-5)',
        },
        {
            path: '/boton',
            icono: '🖱️',
            etiqueta: 'Botón',
            descripcion: 'Variantes y estados',
            color: 'var(--brand-5-secondary)',
        },
    ];

    return (
        <div className={estilos.contenedor_principal}>
            {/* Fondo decorativo */}
            <div className={estilos.fondo_animado} aria-hidden>
                <div className={estilos.particula_1}></div>
                <div className={estilos.particula_2}></div>
            </div>

            {/* Barra superior vidrio */}
            <header className={estilos.barra_superior_vidrio}>
                <div className={estilos.barra_contenido}>
                    <Link to='/' className={estilos.logo_bloque}>
                        <div className={estilos.logo_icono}>PC</div>
                        <div className={estilos.logo_textos}>
                            <span className={estilos.logo_titulo}>PC Soluciones</span>
                            <span className={estilos.logo_subtitulo}>Laboratorio de Componentes</span>
                        </div>
                    </Link>

                    <div className={estilos.barra_acciones}>
                        <BotonTema />
                    </div>
                </div>
            </header>

            {/* Layout */}
            <div className={estilos.cuerpo_layout}>
                {/* Dock lateral líquido */}
                <aside className={estilos.dock_lateral}>
                    <div className={estilos.dock_cabecera}>
                        <span className={estilos.dock_titulo}>Demo</span>
                    </div>

                    <nav className={estilos.lista_dock}>
                        {elementos_menu.map((item, i) => {
                            const activo = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`${estilos.item_dock} ${activo ? estilos.item_activo : ''}`}
                                    style={{ '--color-item': item.color, '--delay': `${i * 0.06}s` } as CSSProperties}
                                    title={item.descripcion}>
                                    <span className={estilos.item_icono}>{item.icono}</span>
                                    <span className={estilos.item_etiqueta}>{item.etiqueta}</span>
                                    <span className={estilos.item_resalte}></span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className={estilos.dock_pie}>
                        <span className={estilos.pie_chip}>v1.0.0</span>
                    </div>
                </aside>

                <main className={estilos.area_contenido}>
                    <div key={location.pathname} className={estilos.pagina}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
