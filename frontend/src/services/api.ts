import axios from 'axios';

import { SignalRequest, SignalAnalysis, ApiError } from '@/types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    'REACT_APP_API_BASE_URL environment variable is not defined. Please check your .env file.'
  );
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const apiError: ApiError = {
        message: error.response.data?.detail || 'An error occurred',
        status: error.response.status,
      };
      throw apiError;
    } else if (error.request) {
      // Network error
      const apiError: ApiError = {
        message: 'Network error. Please check your connection.',
      };
      throw apiError;
    } else {
      // Something else happened
      const apiError: ApiError = {
        message: 'An unexpected error occurred',
      };
      throw apiError;
    }
  }
);

export const analyzeSignal = async (
  data: number[]
): Promise<SignalAnalysis> => {
  const request: SignalRequest = { data };

  const response = await apiClient.post<SignalAnalysis>(
    '/analisar_sinal',
    request
  );

  return response.data;
};

export { apiClient };
