import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '@/App';

test('renders signal analyzer page', () => {
  render(<App />);
  const heading = screen.getByText(/análise de sinal/i);
  expect(heading).toBeInTheDocument();
});

test('renders input field and button', () => {
  render(<App />);
  const inputField = screen.getByLabelText(/dados do sinal/i);
  const analyzeButton = screen.getByRole('button', { name: /analisar sinal/i });

  expect(inputField).toBeInTheDocument();
  expect(analyzeButton).toBeInTheDocument();
  expect(analyzeButton).toBeDisabled(); // Should be disabled when input is empty
});
