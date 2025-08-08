import type React from 'react';

export type Option = {
    value: string;
    label: string;
    descripcion?: string;
};

type RadiusType = string;
type TamannioType = string;

export type CheckboxGroupProps = {
    /** Lista de opciones */
    options: Option[];
    /** Orientación del listado @default vertical */
    orientation?: 'vertical' | 'horizontal';
    valores?: string[];
    /** Valores iniciales (no controlado) */
    valoresIniciales?: string[];
    /** Callback al cambiar la selección */
    onChange?: (valores: string[]) => void;
    /** Deshabilitar el checkbox @default false*/
    disabled?: boolean;
    /** Checkbox con relleno (true) o sin relleno (false) @default true */
    relleno?: boolean;
    /** Border-radius en px (solo para relleno) @default var(--radius-2) */
    radius?: RadiusType;
    /** Tamaño en px (ancho/alto) */
    size?: TamannioType;
    /** Color al checked @default var(--brand-primary)*/
    color?: string;
    /** Color del borde/outline @default var(--surface-third)*/
    borderColor?: string;

    label?: string;
    lineaMitad?: boolean;
    /** Límite de seleccionados (0 o undefined = sin límite) */
    maxSelecionados?: number;
    /** Requerido (solo semántico/aria) */
    required?: boolean;
    /** Si true añade “*” visual a la etiqueta (si hay label) */
    requiredConAsterisco?: boolean;
    /** Tachar el texto de la opción cuando está checkeada */
    tachado?: boolean;
    /** Solo lectura (bloquea alternar pero se puede enfocar) */
    readOnly?: boolean;
    className?: string;
    classInterna?: string;
};

export type CheckBoxIndicadorProps = {
    /** Checkbox con relleno (true) o sin relleno (false) @default true */
    relleno?: boolean;
    /** Si ya está seleccionado el checkbox*/
    checked?: boolean;
    /** Callback al cambiar la selección */
    alternar?: () => void;
    /** Deshabilitar el checkbox @default false*/
    disabled?: boolean;
    /** Tamaño en px (ancho/alto) */
    size?: TamannioType;
    /** Border-radius en px (solo para relleno) @default var(--radius-2) */
    radius?: RadiusType;
    /** Color al checked @default var(--brand-primary)*/
    color?: string;
    /** Color del borde/outline @default var(--surface-third)*/
    borderColor?: string;
    /**Si al estar checked se pone una línea como simulando el tachar de una lista */
    tachado?: boolean;
};

export type CheckboxOptions = {
    option: Option;
    orientation: 'vertical' | 'horizontal';
    name?: string;
    className?: string;
    classInterna?: string;
};

export type CheckboxGroupCustomProps<T extends { value: string }> = {
    /** Lista de opciones con su valor único */
    opciones: T[];
    /** Valores iniciales (no controlado) */
    valoresIniciales?: string[];
    /** Callback al cambiar la selección */
    onChange?: (values: string[]) => void;
    /** Deshabilita todo el grupo */
    disabled?: boolean;

    /**
     * Render-prop: recibe cada `opcion` (de tipo T) y devuelve:
     * - `checked` (si está marcada)
     * - `toggle()` para alternar
     * - `disabled`
     */
    children: (
        opcion: T,
        props: {
            checked: boolean;
            alternar: () => void;
            disabled: boolean;
        }
    ) => React.ReactNode;
};

export type ContextoCheckboxGroup = {
    valores: string[];
    alternar: (valor: string) => void;
    /** El grupo completo está deshabilitado */
    disabled?: boolean;
    /** Tamaño en px (ancho/alto) */
    size?: string;
    /** Border-radius en px (solo para relleno) */
    radius?: string;
    /** Color al checked */
    color?: string;
    /** Color del borde/outline */
    borderColor?: string;
    relleno?: boolean;
    lineaMitad?: boolean;

    /** Máximo de seleccionados (0 o undefined = sin límite) */
    maxSelecionados?: number;
    /** Marcar texto tachado cuando está checkeado */
    tachado?: boolean;
    /** Tead-only a nivel grupo */
    readOnly?: boolean;

    /** Inndica si ya se alcanzó el límite */
    limiteAlcanzado: boolean;
    /**Saber si una opción debe estar deshabilitada por límite */
    isOpcionDisabled: (valor: string) => boolean;
};
