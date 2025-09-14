import React from 'react';

import {
  StyledSubmitButton,
  LoadingSpinner,
  ButtonText,
} from './SubmitButton.styled';

import { SubmitButtonProps } from '@/types';

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  children,
}) => {
  return (
    <StyledSubmitButton
      variant="contained"
      size="large"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <LoadingSpinner size={24} />}
      <ButtonText isLoading={loading}>{children}</ButtonText>
    </StyledSubmitButton>
  );
};
