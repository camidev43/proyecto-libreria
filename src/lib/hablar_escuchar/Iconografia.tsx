import type { SVGProps } from 'react';

export function MicrofonoIcono(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}>
      <g fill="currentColor">
        <path d="M5 3a3 3 0 0 1 6 0v4a3 3 0 0 1-6 0z" />
        <path d="M8 11a4 4 0 0 1-4-4H2a6 6 0 0 0 5 5.917V14H5v2h6v-2H9v-1.083A6 6 0 0 0 14 7h-2a4 4 0 0 1-4 4" />
      </g>
    </svg>
  );
}

export function SonidoIcono(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" {...props}>
      <path
        fill="currentColor"
        d="M18 5.433c0-1.398-1.742-2.036-2.645-.97l-4.086 4.83A2 2 0 0 1 9.743 10H6a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h3.743a2 2 0 0 1 1.526.708l4.086 4.829c.902 1.066 2.645.428 2.645-.97zm3.433 3.743a1 1 0 0 1 1.391.258c1.465 2.13 2.238 4.324 2.238 6.566s-.773 4.436-2.238 6.567a1 1 0 1 1-1.648-1.133c1.285-1.87 1.887-3.676 1.887-5.434s-.602-3.564-1.887-5.433a1 1 0 0 1 .258-1.39m4.257-3.9a1 1 0 0 0-1.38 1.448c2.387 2.273 3.628 5.739 3.628 9.276s-1.241 7.003-3.628 9.276a1 1 0 0 0 1.38 1.448c2.863-2.727 4.247-6.761 4.247-10.724S28.554 8.003 25.69 5.276"
      />
    </svg>
  );
}

export function GrabacionIcono(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 21" {...props}>
      <circle cx="12" cy="12" r="6" fill="currentColor" opacity=".5" />
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2m0 16a6 6 0 1 1 6-6a6.007 6.007 0 0 1-6 6"
      />
    </svg>
  );
}

export default { MicrofonoIcono, SonidoIcono, GrabacionIcono };
