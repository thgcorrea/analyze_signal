import { renderHook, act } from '@testing-library/react';

import { analyzeSignal } from '@/services/api';
import { TrendType } from '@/types';
import { useSignalAnalysis } from '@/hooks/useSignalAnalysis';

// Mock the API service
jest.mock('@/services/api', () => ({
  analyzeSignal: jest.fn(),
}));

const mockAnalyzeSignal = analyzeSignal as jest.MockedFunction<typeof analyzeSignal>;

describe('useSignalAnalysis', () => {
  beforeEach(() => {
    mockAnalyzeSignal.mockClear();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useSignalAnalysis());

    expect(result.current.analysis).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.analyze).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  it('handles successful analysis', async () => {
    const mockResult = {
      average: 5.5,
      minimum: 2,
      maximum: 9,
      trend: TrendType.ASCENDING
    };

    mockAnalyzeSignal.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useSignalAnalysis());

    await act(async () => {
      await result.current.analyze([1, 2, 3, 4, 5]);
    });

    expect(result.current.analysis).toEqual(mockResult);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockAnalyzeSignal).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
  });

  it('sets loading state during analysis', async () => {
    mockAnalyzeSignal.mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve({
        average: 5.5,
        minimum: 2,
        maximum: 9,
        trend: TrendType.ASCENDING
      }), 50))
    );

    const { result } = renderHook(() => useSignalAnalysis());

    act(() => {
      result.current.analyze([1, 2, 3, 4, 5]);
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.analysis).toBeNull();

    // Wait for the analysis to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.analysis).not.toBeNull();
  });

  it('handles API errors', async () => {
    const mockError = { message: 'Internal server error' };
    mockAnalyzeSignal.mockRejectedValue(mockError);

    const { result } = renderHook(() => useSignalAnalysis());

    await act(async () => {
      await result.current.analyze([1, 2, 3, 4, 5]);
    });

    expect(result.current.analysis).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Internal server error');
  });

  it('clears previous data before new analysis', async () => {
    const firstResult = {
      average: 3,
      minimum: 1,
      maximum: 5,
      trend: TrendType.STABLE
    };

    const secondResult = {
      average: 10,
      minimum: 5,
      maximum: 15,
      trend: TrendType.DESCENDING
    };

    mockAnalyzeSignal.mockResolvedValueOnce(firstResult);

    const { result } = renderHook(() => useSignalAnalysis());

    // First analysis
    await act(async () => {
      await result.current.analyze([1, 2, 3]);
    });

    expect(result.current.analysis).toEqual(firstResult);

    // Second analysis should clear previous data first
    mockAnalyzeSignal.mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve(secondResult), 50))
    );

    act(() => {
      result.current.analyze([5, 10, 15]);
    });

    // During loading, previous analysis should be cleared
    expect(result.current.analysis).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('resets all state when reset is called', async () => {
    const mockResult = {
      average: 5.5,
      minimum: 2,
      maximum: 9,
      trend: TrendType.ASCENDING
    };

    mockAnalyzeSignal.mockResolvedValue(mockResult);

    const { result } = renderHook(() => useSignalAnalysis());

    // First, perform an analysis
    await act(async () => {
      await result.current.analyze([1, 2, 3, 4, 5]);
    });

    expect(result.current.analysis).not.toBeNull();

    // Then reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.analysis).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('resets error state when reset is called', async () => {
    const mockError = { message: 'Bad request' };
    mockAnalyzeSignal.mockRejectedValue(mockError);

    const { result } = renderHook(() => useSignalAnalysis());

    // First, cause an error
    await act(async () => {
      await result.current.analyze([1, 2, 3]);
    });

    expect(result.current.error).toBe('Bad request');

    // Then reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.error).toBeNull();
  });
});