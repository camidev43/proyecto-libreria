// vitest.setup.ts
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
// ⬇️ Importa TODOS los matchers como un objeto (no default)

expect.extend(matchers); // registra toBeInTheDocument, etc.

afterEach(() => {
    cleanup(); // limpia el DOM tras cada test
});
