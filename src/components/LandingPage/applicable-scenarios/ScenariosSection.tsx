'use client';

import React from 'react';

import styled from '@emotion/styled';

import type { ScenariosSectionProps } from './interface';
import ScenarioCard from './ScenarioCard';

const Container = styled.section`
  padding: 122px 0 160px;
  background: #fff;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const Content = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const Title = styled.h2`
  margin: 0 auto 80px auto;
  font-family: Roboto;
  font-size: 36px;
  font-weight: bold;
  line-height: normal;
  color: #14183b;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
    margin: 0 0 40px 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ScenariosSection: React.FC<ScenariosSectionProps> = ({
  scenarios,
  title = 'Applicable Scenarios',
  className,
}) => {
  return (
    <Container className={className}>
      <Content>
        <Title>{title}</Title>
        <Grid>
          {scenarios.map(scenario => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </Grid>
      </Content>
    </Container>
  );
};

export default ScenariosSection;
