import React, { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  Calculate,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@mui/icons-material';

import {
  MainContainer,
  HeaderContainer,
  MainTitle,
  SubTitle,
  FormPaper,
  InputContainer,
  ButtonContainer,
  ErrorAlert,
  ResultsContainer,
  ResultsDivider,
  ResultsTitle,
  ResultsGrid,
} from './SignalAnalyzer.styled';

import { InputField } from '@/shared/InputField';
import { SubmitButton } from '@/shared/SubmitButton';
import { ResultCard } from '@/shared/ResultCard';
import { useSignalAnalysis } from '@/hooks/useSignalAnalysis';
import { parseNumberInput, validateNumberInput } from '@/utils/inputParser';
import { TrendType, ResultCardColor } from '@/types';

export const SignalAnalyzer: React.FC = () => {
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState<string | undefined>();
  const { analysis, loading, error, analyze, reset } = useSignalAnalysis();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const handleInputChange = (value: string) => {
    setInput(value);

    if (inputError) {
      setInputError(undefined);
    }
    if (error) {
      reset();
    }
  };

  const handleAnalyze = async () => {
    const validation = validateNumberInput(input);
    if (!validation.isValid) {
      setInputError(validation.error);
      reset();
      return;
    }

    try {
      const numbers = parseNumberInput(input);
      await analyze(numbers);
    } catch (err) {
      setInputError(
        err instanceof Error ? err.message : 'Failed to parse input'
      );
    }
  };

  const getTrendIcon = (trend: TrendType) => {
    switch (trend) {
      case TrendType.ASCENDING:
        return <TrendingUp fontSize="large" />;
      case TrendType.DESCENDING:
        return <TrendingDown fontSize="large" />;
      default:
        return <TrendingFlat fontSize="large" />;
    }
  };

  const trendColorMap = {
    [TrendType.ASCENDING]: ResultCardColor.SUCCESS,
    [TrendType.DESCENDING]: ResultCardColor.ERROR,
    [TrendType.STABLE]: ResultCardColor.WARNING,
  };

  const trendTextMap = {
    [TrendType.ASCENDING]: 'Ascendente',
    [TrendType.DESCENDING]: 'Descendente',
    [TrendType.STABLE]: 'Estável',
  };

  const isAnalyzeDisabled = !input.trim() || loading;

  return (
    <MainContainer maxWidth="md">
      <HeaderContainer>
        <MainTitle variant="h3" component="h1" gutterBottom>
          Análise de Sinal
        </MainTitle>
        <SubTitle variant="h6" color="text.secondary" paragraph>
          Digite uma sequência de números separados por vírgula para analisar o
          sinal
        </SubTitle>
      </HeaderContainer>

      <FormPaper elevation={3}>
        <InputContainer>
          <InputField
            label="Dados do Sinal"
            placeholder="Ex: 1, 2, 3, 4, 5"
            value={input}
            onChange={handleInputChange}
            error={inputError}
            disabled={loading}
          />
        </InputContainer>

        <ButtonContainer>
          <SubmitButton
            onClick={handleAnalyze}
            disabled={isAnalyzeDisabled}
            loading={loading}
          >
            Analisar Sinal
          </SubmitButton>
        </ButtonContainer>

        {error && <ErrorAlert severity="error">{error}</ErrorAlert>}

        {analysis && (
          <ResultsContainer>
            <ResultsDivider />
            <ResultsTitle variant="h5" gutterBottom>
              Resultados da Análise
            </ResultsTitle>
            {isDesktop ? (
              <ResultsGrid container spacing={3}>
                <ResultsGrid item lg={6}>
                  <ResultCard
                    title="Mínimo"
                    value={analysis.minimum}
                    icon={<KeyboardArrowDown fontSize="large" />}
                    color={ResultCardColor.SECONDARY}
                  />
                </ResultsGrid>
                <ResultsGrid item lg={6}>
                  <ResultCard
                    title="Máximo"
                    value={analysis.maximum}
                    icon={<KeyboardArrowUp fontSize="large" />}
                    color={ResultCardColor.SECONDARY}
                  />
                </ResultsGrid>

                <ResultsGrid item lg={6}>
                  <ResultCard
                    title="Média"
                    value={analysis.average.toFixed(2)}
                    icon={<Calculate fontSize="large" />}
                    color={ResultCardColor.PRIMARY}
                  />
                </ResultsGrid>
                <ResultsGrid item lg={6}>
                  <ResultCard
                    title="Tendência"
                    icon={getTrendIcon(analysis.trend)}
                    value={trendTextMap[analysis.trend]}
                    color={trendColorMap[analysis.trend]}
                  />
                </ResultsGrid>
              </ResultsGrid>
            ) : (
              <ResultsGrid container spacing={3}>
                <ResultsGrid item xs={12} sm={6}>
                  <ResultCard
                    title="Média"
                    value={analysis.average.toFixed(2)}
                    icon={<Calculate fontSize="large" />}
                    color={ResultCardColor.PRIMARY}
                  />
                </ResultsGrid>
                <ResultsGrid item xs={12} sm={6}>
                  <ResultCard
                    title="Mínimo"
                    value={analysis.minimum}
                    icon={<KeyboardArrowDown fontSize="large" />}
                    color={ResultCardColor.SECONDARY}
                  />
                </ResultsGrid>
                <ResultsGrid item xs={12} sm={6}>
                  <ResultCard
                    title="Máximo"
                    value={analysis.maximum}
                    icon={<KeyboardArrowUp fontSize="large" />}
                    color={ResultCardColor.SECONDARY}
                  />
                </ResultsGrid>
                <ResultsGrid item xs={12} sm={6}>
                  <ResultCard
                    title="Tendência"
                    icon={getTrendIcon(analysis.trend)}
                    value={trendTextMap[analysis.trend]}
                    color={trendColorMap[analysis.trend]}
                  />
                </ResultsGrid>
              </ResultsGrid>
            )}
          </ResultsContainer>
        )}
      </FormPaper>
    </MainContainer>
  );
};
