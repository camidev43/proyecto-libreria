import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import useFirmaLogica from './useFirmaLogica';

// Mock para HTMLCanvasElement
const mockCanvas = {
  getContext: vi.fn(() => ({
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    strokeStyle: '',
    lineWidth: 0,
    lineCap: '',
    lineJoin: '',
  })),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  toDataURL: vi.fn(() => 'data:image/png;base64,test'),
  width: 400,
  height: 200,
  getBoundingClientRect: vi.fn(() => ({
    left: 0,
    top: 0,
    width: 400,
    height: 200,
  })),
};

describe('lib > FirmaManual > useFirmaLogica', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock getBoundingClientRect para el canvas
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      writable: true,
      value: vi.fn(() => mockCanvas.getContext()),
    });
  });

  it('se renderiza correctamente', () => {
    const { result } = renderHook(() => useFirmaLogica());

    expect(result.current).toMatchSnapshot();
    expect(result.current.estaVacio).toBe(true);
    expect(typeof result.current.limpiarCanvas).toBe('function');
    expect(typeof result.current.obtenerDatosFirma).toBe('function');
    expect(typeof result.current.configurarCanvas).toBe('function');
  });

  it('limpia el canvas correctamente', () => {
    const { result } = renderHook(() => useFirmaLogica());

    // Simular que hay un canvas
    Object.defineProperty(result.current.canvasRef, 'current', {
      value: mockCanvas,
      writable: true,
    });

    act(() => {
      result.current.limpiarCanvas();
    });

    expect(result.current.estaVacio).toBe(true);
  });

  it('retorna null cuando no hay firma', () => {
    const { result } = renderHook(() => useFirmaLogica());

    const signatureData = result.current.obtenerDatosFirma();
    expect(signatureData).toBe(null);
  });
});
