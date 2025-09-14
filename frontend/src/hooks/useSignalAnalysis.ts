import { useState, useCallback } from 'react';

import { analyzeSignal } from '@/services/api';
import { SignalAnalysis, ApiError } from '@/types';

interface UseSignalAnalysisReturn {
  analysis: SignalAnalysis | null;
  loading: boolean;
  error: string | null;
  analyze: (data: number[]) => Promise<void>;
  reset: () => void;
}

export const useSignalAnalysis = (): UseSignalAnalysisReturn => {
  const [analysis, setAnalysis] = useState<SignalAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (data: number[]) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeSignal(data);
      setAnalysis(result);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    analysis,
    loading,
    error,
    analyze,
    reset,
  };
};
