import styled from '@emotion/styled';
import { Button, CircularProgress } from '@mui/material';

export const StyledSubmitButton = styled(Button)(() => ({
  height: 56,
  borderRadius: 8,
  textTransform: 'none' as const,
  fontSize: '1.1rem',
  fontWeight: 600,
  position: 'relative' as const,
  width: '100%',
}));

export const LoadingSpinner = styled(CircularProgress)(() => ({
  position: 'absolute' as const,
  left: '50%',
  top: '50%',
  marginLeft: '-12px',
  marginTop: '-12px',
}));

export const ButtonText = styled.span<{ isLoading?: boolean }>(
  ({ isLoading }) => ({
    visibility: isLoading ? 'hidden' : 'visible',
  })
);
