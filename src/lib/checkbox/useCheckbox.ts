// contextos/useCheckboxGroup.ts
import { createContext, useContext } from 'react';

import type { ContextoCheckboxGroup } from './types';

export const GrupoContexto = createContext<ContextoCheckboxGroup | null>(null);

export function useCheckboxGroup() {
    const ctx = useContext(GrupoContexto);
    if (!ctx) {
        throw new Error('useCheckboxGroup debe usarse dentro de un <CheckboxGroup> provider');
    }
    return ctx;
}
