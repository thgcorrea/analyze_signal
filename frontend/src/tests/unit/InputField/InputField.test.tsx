import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { InputField } from '@/shared/InputField/InputField';

describe('InputField', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders input with label and placeholder', () => {
    render(
      <InputField
        value=""
        onChange={mockOnChange}
        label="Test Label"
        placeholder="Test placeholder"
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(
      <InputField
        value="test value"
        onChange={mockOnChange}
        label="Test Label"
      />
    );

    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('calls onChange when user types', () => {
    render(<InputField value="" onChange={mockOnChange} label="Test Label" />);

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledWith('new value');
  });

  it('displays error message', () => {
    render(
      <InputField
        value=""
        onChange={mockOnChange}
        label="Test Label"
        error="This is an error"
      />
    );

    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <InputField
        value=""
        onChange={mockOnChange}
        label="Test Label"
        disabled
      />
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });

  it('is not disabled by default', () => {
    render(<InputField value="" onChange={mockOnChange} label="Test Label" />);

    const input = screen.getByLabelText('Test Label');
    expect(input).not.toBeDisabled();
  });
});
