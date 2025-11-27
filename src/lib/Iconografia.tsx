import type { FC } from 'react';

type IconProps = {
  className?: string;
  title?: string;
};

export const IconUndo: FC<IconProps> = ({ className, title = 'Deshacer' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden={!title} role="img">
    <title>{title}</title>
    <path d="M3 7v6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconTrash: FC<IconProps> = ({ className, title = 'Limpiar' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden={!title} role="img">
    <title>{title}</title>
    <path
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconUpload: FC<IconProps> = ({ className, title = 'Adjuntar' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden={!title} role="img">
    <title>{title}</title>
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconClose: FC<IconProps> = ({ className, title = 'Cerrar' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden={!title} role="img">
    <title>{title}</title>
    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default {
  IconUndo,
  IconTrash,
  IconUpload,
  IconClose,
};
