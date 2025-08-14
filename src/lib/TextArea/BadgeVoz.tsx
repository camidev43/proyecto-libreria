import clsx from 'clsx';

import { MicrofonoIcono, SonidoIcono } from './Iconografia';
import estilos from './TextArea.module.css';
type Props = {
    tipo: 'mic' | 'tts';
    texto: string;
    size?: 'sm' | 'md' | 'lg';
    estirar?: boolean;
};

export default function BadgeVoz({ tipo, texto, size = 'md', estirar }: Props) {
    const esMic = tipo === 'mic';
    return (
        <span
            className={clsx(
                estilos.badge_voz,
                esMic ? estilos.badge_mic : estilos.badge_tts,
                estilos[`badge_${size}`],
                estirar && estilos.badge_estirada // ⬅️
            )}
            data-tipo={tipo}>
            <span className={estilos.badge_icono}>{esMic ? <MicrofonoIcono /> : <SonidoIcono />}</span>
            <span className={estilos.badge_texto}>{texto}</span>
            {esMic ? (
                <span className={estilos.badge_ondas} aria-hidden='true'>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            ) : (
                <span className={estilos.badge_eq} aria-hidden='true'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            )}
        </span>
    );
}
