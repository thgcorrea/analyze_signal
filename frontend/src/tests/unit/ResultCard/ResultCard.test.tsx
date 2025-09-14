import React from 'react';
import { render, screen } from '@testing-library/react';
import { Calculate } from '@mui/icons-material';

import { ResultCardColor } from '@/types';
import { ResultCard } from '@/shared/ResultCard/ResultCard';

describe('ResultCard', () => {
  it('renders title and value', () => {
    render(<ResultCard title="Test Title" value="42" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <ResultCard
        title="Average"
        value="25.5"
        icon={<Calculate data-testid="calculate-icon" />}
      />
    );

    expect(screen.getByTestId('calculate-icon')).toBeInTheDocument();
    expect(screen.getByText('Average')).toBeInTheDocument();
    expect(screen.getByText('25.5')).toBeInTheDocument();
  });

  it('renders with numeric value', () => {
    render(<ResultCard title="Count" value={100} />);

    expect(screen.getByText('Count')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders with primary color by default', () => {
    render(<ResultCard title="Default Color" value="test" />);

    expect(screen.getByText('Default Color')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders with success color', () => {
    render(
      <ResultCard
        title="Success"
        value="test"
        color={ResultCardColor.SUCCESS}
      />
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders with error color', () => {
    render(
      <ResultCard title="Error" value="test" color={ResultCardColor.ERROR} />
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders with warning color', () => {
    render(
      <ResultCard
        title="Warning"
        value="test"
        color={ResultCardColor.WARNING}
      />
    );

    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('renders with secondary color', () => {
    render(
      <ResultCard
        title="Secondary"
        value="test"
        color={ResultCardColor.SECONDARY}
      />
    );

    expect(screen.getByText('Secondary')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
