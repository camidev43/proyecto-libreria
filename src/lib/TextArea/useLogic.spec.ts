import { renderHook, act } from '@testing-library/react';

import useLogic from './useLogic';

describe('lib > TextArea > useLogic', () => {
    it('gestiona modo no controlado con defaultValue', () => {
        const { result } = renderHook(() => useLogic({ defaultValue: 'hola', isClearable: true }));

        expect(result.current.value).toBe('hola');
        expect(result.current.showClear).toBe(true);

        act(() => result.current.handleChange('hola mundo'));
        expect(result.current.value).toBe('hola mundo');

        act(() => result.current.clear());
        expect(result.current.value).toBe('');
    });

    it('respeta modo controlado y llama onChange', () => {
        let ext = 'x';
        const onChange = (v: string) => {
            ext = v;
        };
        const { result, rerender } = renderHook(({ v }) => useLogic({ value: v, onChange, isClearable: true }), {
            initialProps: { v: ext },
        });

        expect(result.current.value).toBe('x');
        expect(result.current.showClear).toBe(true);

        act(() => result.current.handleChange('y'));
        expect(ext).toBe('y');

        // el hook no controla el valor en controlado; lo actualiza el padre:
        rerender({ v: ext });
        expect(result.current.value).toBe('y');

        act(() => result.current.clear());
        expect(ext).toBe(''); // onChange('') llamado
    });

    it('bloquea cambios si está disabled o readOnly', () => {
        const onChange = jest.fn();
        const { result, rerender } = renderHook(
            (p: { disabled?: boolean; readOnly?: boolean }) =>
                useLogic({ defaultValue: 'a', onChange, isDisabled: p.disabled, isReadOnly: p.readOnly }),
            { initialProps: { disabled: true, readOnly: false } }
        );

        act(() => result.current.handleChange('b'));
        expect(result.current.value).toBe('a');
        expect(onChange).not.toHaveBeenCalled();

        rerender({ disabled: false, readOnly: true });
        act(() => result.current.handleChange('c'));
        expect(result.current.value).toBe('a');
        expect(onChange).not.toHaveBeenCalled();
    });

    it('valida y expone mensaje de error', () => {
        const validate = (v: string) => (v.length >= 3 ? true : 'Muy corto');
        const { result } = renderHook(() => useLogic({ defaultValue: 'hi', validate }));

        // arranca con error
        expect(result.current.validation.invalido).toBe(true);
        expect(result.current.validation.mensaje).toBe('Muy corto');

        act(() => result.current.handleChange('hola'));
        expect(result.current.validation.invalido).toBe(false);
        expect(result.current.validation.mensaje).toBeNull();
    });

    it('expone y actualiza estado de foco', () => {
        const { result } = renderHook(() => useLogic({ defaultValue: '' }));
        expect(result.current.focused).toBe(false);
        act(() => result.current.setFocused(true));
        expect(result.current.focused).toBe(true);
    });

    it('deriva flags de voz simples', () => {
        const { result, rerender } = renderHook(
            (p: { val?: string; dis?: boolean; ro?: boolean }) =>
                useLogic({ value: p.val, isDisabled: p.dis, isReadOnly: p.ro }),
            { initialProps: { val: 'hola', dis: false, ro: false } }
        );

        expect(result.current.canSpeak).toBe(true);
        expect(result.current.canListen).toBe(true);

        rerender({ val: '', dis: false, ro: false });
        expect(result.current.canSpeak).toBe(false);

        rerender({ val: 'x', dis: true, ro: false });
        expect(result.current.canSpeak).toBe(false);
        expect(result.current.canListen).toBe(false);

        rerender({ val: 'x', dis: false, ro: true });
        expect(result.current.canListen).toBe(false);
    });
});
