// .storybook/vitest.setup.ts
import '@testing-library/jest-dom/vitest'; // matchers listos para Vitest
import { setProjectAnnotations } from '@storybook/react-vite';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

// 👇 IMPORTANTE: usar el framework que usas (React + Vite)

// Si tienes .storybook/preview.(ts|tsx), impórtalo:
import * as preview from './preview';

// Inyecta decorators/parameters/render del renderer + tu preview
const annotations = setProjectAnnotations([preview]);

// Ejecuta beforeAll global de Storybook (carga de addons, decorators, etc.)
beforeAll(annotations.beforeAll);

// Limpieza de Testing Library tras cada test
afterEach(() => cleanup());
