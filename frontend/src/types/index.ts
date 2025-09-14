import { TrendType, ResultCardColor } from './enums';

export { TrendType, ResultCardColor } from './enums';

export interface SignalRequest {
  data: number[];
}

export interface SignalAnalysis {
  average: number;
  minimum: number;
  maximum: number;
  trend: TrendType;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
}

export interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export interface ResultCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: ResultCardColor;
}
