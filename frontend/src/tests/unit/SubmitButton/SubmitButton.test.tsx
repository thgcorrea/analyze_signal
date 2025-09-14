import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { SubmitButton } from '@/shared/SubmitButton/SubmitButton';

describe('SubmitButton', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders button with children text', () => {
    render(<SubmitButton onClick={mockOnClick}>Test Button</SubmitButton>);

    expect(
      screen.getByRole('button', { name: 'Test Button' })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<SubmitButton onClick={mockOnClick}>Click me</SubmitButton>);

    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <SubmitButton onClick={mockOnClick} disabled>
        Disabled Button
      </SubmitButton>
    );

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    expect(button).toBeDisabled();
  });

  it('is disabled when loading is true', () => {
    render(
      <SubmitButton onClick={mockOnClick} loading>
        Loading Button
      </SubmitButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading spinner when loading', () => {
    render(
      <SubmitButton onClick={mockOnClick} loading>
        Loading Button
      </SubmitButton>
    );

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('hides text when loading', () => {
    render(
      <SubmitButton onClick={mockOnClick} loading>
        Loading Button
      </SubmitButton>
    );

    const buttonText = screen.getByText('Loading Button');
    expect(buttonText).toHaveStyle('visibility: hidden');
  });

  it('does not call onClick when disabled', () => {
    render(
      <SubmitButton onClick={mockOnClick} disabled>
        Disabled Button
      </SubmitButton>
    );

    const button = screen.getByRole('button', { name: 'Disabled Button' });
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('is not disabled by default', () => {
    render(<SubmitButton onClick={mockOnClick}>Normal Button</SubmitButton>);

    const button = screen.getByRole('button', { name: 'Normal Button' });
    expect(button).not.toBeDisabled();
  });
});
