import styled from '@emotion/styled';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const ResultCardContainer = styled(Card)<{ colorValue?: string }>(
  ({ colorValue }) => ({
    borderRadius: '8px',
    border: `2px solid ${colorValue}20`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  })
);

export const StyledCardContent = styled(CardContent)(() => ({
  padding: 24,
}));

export const CardContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}));

export const IconContainer = styled(Box)<{ colorValue?: string }>(
  ({ colorValue }) => ({
    color: colorValue,
    display: 'flex',
    alignItems: 'center',
  })
);

export const ContentContainer = styled(Box)(() => ({
  flex: 1,
}));

export const CardTitle = styled(Typography)<{
  component?: React.ElementType;
}>(() => ({}));

export const CardValue = styled(Typography)<{
  colorValue?: string;
  component?: React.ElementType;
}>(({ colorValue }) => ({
  color: colorValue,
  fontWeight: 700,
  lineHeight: 1.2,
}));
