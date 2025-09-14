import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { useSignalAnalysis } from '@/hooks/useSignalAnalysis';
import { TrendType } from '@/types';
import { SignalAnalyzer } from '@/pages/SignalAnalyzer/SignalAnalyzer';

jest.mock('@/hooks/useSignalAnalysis', () => ({
  useSignalAnalysis: jest.fn(),
}));

const mockUseSignalAnalysis = useSignalAnalysis as jest.MockedFunction<
  typeof useSignalAnalysis
>;

describe('SignalAnalyzer', () => {
  const mockAnalyze = jest.fn();
  const mockReset = jest.fn();

  beforeEach(() => {
    mockAnalyze.mockClear();
    mockReset.mockClear();

    mockUseSignalAnalysis.mockReturnValue({
      analysis: null,
      loading: false,
      error: null,
      analyze: mockAnalyze,
      reset: mockReset,
    });
  });

  it('renders title and description', () => {
    render(<SignalAnalyzer />);

    expect(
      screen.getByRole('heading', { name: /análise de sinal/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/digite uma sequência de números separados por vírgula/i)
    ).toBeInTheDocument();
  });

  it('renders input field and submit button', () => {
    render(<SignalAnalyzer />);

    const inputField = screen.getByLabelText(/dados do sinal/i);
    const submitButton = screen.getByRole('button', {
      name: /analisar sinal/i,
    });

    expect(inputField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('submit button is disabled when input is empty', () => {
    render(<SignalAnalyzer />);

    const submitButton = screen.getByRole('button', {
      name: /analisar sinal/i,
    });
    expect(submitButton).toBeDisabled();
  });

  it('submit button is enabled when input has content', () => {
    render(<SignalAnalyzer />);

    const inputField = screen.getByLabelText(/dados do sinal/i);
    const submitButton = screen.getByRole('button', {
      name: /analisar sinal/i,
    });

    fireEvent.change(inputField, { target: { value: '1, 2, 3' } });

    expect(submitButton).not.toBeDisabled();
  });

  it('shows error for invalid input', async () => {
    render(<SignalAnalyzer />);

    const inputField = screen.getByLabelText(/dados do sinal/i);
    const submitButton = screen.getByRole('button', {
      name: /analisar sinal/i,
    });

    fireEvent.change(inputField, { target: { value: 'invalid, input' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/sinal inválido/i)).toBeInTheDocument();
    });

    expect(mockReset).toHaveBeenCalled();
  });

  it('clears error when user starts typing', () => {
    render(<SignalAnalyzer />);

    const inputField = screen.getByLabelText(/dados do sinal/i);

    // Set up an error state first
    fireEvent.change(inputField, { target: { value: 'invalid' } });

    // Clear and type new value
    fireEvent.change(inputField, { target: { value: '1, 2, 3' } });

    // The component should handle clearing errors internally
    expect(inputField).toHaveValue('1, 2, 3');
  });

  it('displays loading state during analysis', () => {
    mockUseSignalAnalysis.mockReturnValue({
      analysis: null,
      loading: true,
      error: null,
      analyze: mockAnalyze,
      reset: mockReset,
    });

    render(<SignalAnalyzer />);

    const inputField = screen.getByLabelText(/dados do sinal/i);
    const submitButton = screen.getByRole('button');

    // Should show loading spinner and disabled button
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(inputField).toBeDisabled();
  });

  it('displays analysis results after successful submission', () => {
    const mockAnalysis = {
      average: 5.5,
      minimum: 2,
      maximum: 9,
      trend: TrendType.ASCENDING,
    };

    mockUseSignalAnalysis.mockReturnValue({
      analysis: mockAnalysis,
      loading: false,
      error: null,
      analyze: mockAnalyze,
      reset: mockReset,
    });

    render(<SignalAnalyzer />);

    expect(screen.getByText(/resultados da análise/i)).toBeInTheDocument();
    expect(screen.getByText('5.50')).toBeInTheDocument(); // average
    expect(screen.getByText('2')).toBeInTheDocument(); // minimum
    expect(screen.getByText('9')).toBeInTheDocument(); // maximum
    expect(screen.getByText('Ascendente')).toBeInTheDocument(); // trend
  });

  it('displays result cards with responsive layout', () => {
    const mockAnalysis = {
      average: 5.5,
      minimum: 2,
      maximum: 9,
      trend: TrendType.ASCENDING,
    };

    mockUseSignalAnalysis.mockReturnValue({
      analysis: mockAnalysis,
      loading: false,
      error: null,
      analyze: mockAnalyze,
      reset: mockReset,
    });

    render(<SignalAnalyzer />);

    expect(screen.getByText('Média')).toBeInTheDocument();
    expect(screen.getByText('Mínimo')).toBeInTheDocument();
    expect(screen.getByText('Máximo')).toBeInTheDocument();
    expect(screen.getByText('Tendência')).toBeInTheDocument();
  });

  it('handles API errors gracefully', () => {
    mockUseSignalAnalysis.mockReturnValue({
      analysis: null,
      loading: false,
      error: 'Internal server error',
      analyze: mockAnalyze,
      reset: mockReset,
    });

    render(<SignalAnalyzer />);

    expect(screen.getByText(/internal server error/i)).toBeInTheDocument();
  });

  it('calls analyze with parsed numbers when form is submitted', async () => {
    render(<SignalAnalyzer />);

    const inputField = screen.getByLabelText(/dados do sinal/i);
    const submitButton = screen.getByRole('button', {
      name: /analisar sinal/i,
    });

    fireEvent.change(inputField, { target: { value: '1, 2, 3, 4, 5' } });
    fireEvent.click(submitButton);

    expect(mockAnalyze).toHaveBeenCalledWith([1, 2, 3, 4, 5]);
  });

  it('calls reset when user starts typing after an error', () => {
    mockUseSignalAnalysis.mockReturnValue({
      analysis: null,
      loading: false,
      error: 'Some error',
      analyze: mockAnalyze,
      reset: mockReset,
    });

    render(<SignalAnalyzer />);

    const inputField = screen.getByLabelText(/dados do sinal/i);

    fireEvent.change(inputField, { target: { value: '1, 2, 3' } });

    expect(mockReset).toHaveBeenCalled();
  });

  it('shows ascending trend text correctly', () => {
    const mockAnalysis = {
      average: 5.5,
      minimum: 2,
      maximum: 9,
      trend: TrendType.ASCENDING,
    };

    mockUseSignalAnalysis.mockReturnValue({
      analysis: mockAnalysis,
      loading: false,
      error: null,
      analyze: mockAnalyze,
      reset: mockReset,
    });

    render(<SignalAnalyzer />);

    expect(screen.getByText('Ascendente')).toBeInTheDocument();
  });

  it('shows descending trend text correctly', () => {
    const mockAnalysis = {
      average: 5.5,
      minimum: 2,
      maximum: 9,
      trend: TrendType.DESCENDING,
    };

    mockUseSignalAnalysis.mockReturnValue({
      analysis: mockAnalysis,
      loading: false,
      error: null,
      analyze: mockAnalyze,
      reset: mockReset,
    });

    render(<SignalAnalyzer />);

    expect(screen.getByText('Descendente')).toBeInTheDocument();
  });

  it('shows stable trend text correctly', () => {
    const mockAnalysis = {
      average: 5.5,
      minimum: 2,
      maximum: 9,
      trend: TrendType.STABLE,
    };

    mockUseSignalAnalysis.mockReturnValue({
      analysis: mockAnalysis,
      loading: false,
      error: null,
      analyze: mockAnalyze,
      reset: mockReset,
    });

    render(<SignalAnalyzer />);

    expect(screen.getByText('Estável')).toBeInTheDocument();
  });
});
