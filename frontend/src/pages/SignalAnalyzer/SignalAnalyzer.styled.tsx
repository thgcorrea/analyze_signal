import styled from '@emotion/styled';
import {
  Container,
  Typography,
  Box,
  Grid,
  Alert,
  Paper,
  Divider,
} from '@mui/material';

export const MainContainer = styled(Container)<{
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}>(() => ({
  paddingTop: 32,
  paddingBottom: 32,
}));

export const HeaderContainer = styled(Box)(() => ({
  textAlign: 'center' as const,
  marginBottom: 32,
}));

export const MainTitle = styled(Typography)<{
  component?: React.ElementType;
}>(() => ({}));

export const SubTitle = styled(Typography)<{
  component?: React.ElementType;
}>(() => ({}));

export const FormPaper = styled(Paper)<{
  elevation?: number;
}>(() => ({
  padding: 32,
  borderRadius: 12,
}));

export const InputContainer = styled(Box)(() => ({
  marginBottom: 24,
}));

export const ButtonContainer = styled(Box)(() => ({
  marginBottom: 32,
}));

export const ErrorAlert = styled(Alert)<{
  severity?: 'error' | 'warning' | 'info' | 'success';
}>(() => ({
  marginBottom: 24,
}));

export const ResultsContainer = styled(Box)(() => ({}));

export const ResultsDivider = styled(Divider)(() => ({
  marginBottom: 24,
}));

export const ResultsTitle = styled(Typography)<{
  component?: React.ElementType;
}>(() => ({
  textAlign: 'center' as const,
}));

export const ResultsGrid = styled(Grid)<{
  container?: boolean;
  spacing?: number;
  item?: boolean;
  lg?: number;
  xs?: number;
  sm?: number;
}>(() => ({}));
