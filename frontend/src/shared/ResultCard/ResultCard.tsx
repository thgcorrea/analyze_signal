import React from 'react';

import {
  ResultCardContainer,
  StyledCardContent,
  CardContainer,
  IconContainer,
  ContentContainer,
  CardTitle,
  CardValue,
} from './ResultCard.styled';

import { ResultCardProps, ResultCardColor } from '@/types';

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  value,
  icon,
  color = ResultCardColor.PRIMARY,
}) => {
  const resultCardColorMap = {
    [ResultCardColor.PRIMARY]: '#1976d2',
    [ResultCardColor.SUCCESS]: '#4caf50',
    [ResultCardColor.WARNING]: '#ff9800',
    [ResultCardColor.ERROR]: '#f44336',
    [ResultCardColor.SECONDARY]: '#9c27b0',
  };

  const colorValue = resultCardColorMap[color];

  return (
    <ResultCardContainer colorValue={colorValue} elevation={2}>
      <StyledCardContent>
        <CardContainer>
          {icon && (
            <IconContainer colorValue={colorValue}>{icon}</IconContainer>
          )}
          <ContentContainer>
            <CardTitle variant="h6" component="h3" gutterBottom>
              {title}
            </CardTitle>
            <CardValue variant="h4" component="p" colorValue={colorValue}>
              {value}
            </CardValue>
          </ContentContainer>
        </CardContainer>
      </StyledCardContent>
    </ResultCardContainer>
  );
};
