import React from 'react';

import { StyledTextField } from './InputField.styled';

import { InputFieldProps } from '@/types';

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  error,
  disabled = false,
  placeholder,
  label,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledTextField
      variant="outlined"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      disabled={disabled}
    />
  );
};
