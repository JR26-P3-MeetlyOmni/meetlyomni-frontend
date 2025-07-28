'use client';

import Image from 'next/image';
import React from 'react';

import styled from '@emotion/styled';

import { ScenarioCardProps } from './interface';

const CardContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  cursor: pointer;
  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 785 / 441.6;
  @media (max-width: 768px) {
    height: 220px;
    aspect-ratio: auto;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  color: white;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 24px 0;
  line-height: 1.3;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0 0 16px 0;
  }
`;

const DescriptionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DescriptionItem = styled.li<{ $isLast?: boolean }>`
  font-size: 16px;
  line-height: 1.5;
  color: #b0b5bc;
  opacity: 0.9;
  margin-bottom: ${({ $isLast }) => ($isLast ? '0' : '10px')};
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: ${({ $isLast }) => ($isLast ? '0' : '6px')};
  }
`;

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, className }) => {
  return (
    <CardContainer className={className}>
      <ImageContainer>
        <Image
          src={scenario.image}
          alt={scenario.imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority
        />
        <Overlay />
      </ImageContainer>

      <ContentContainer>
        <Title>{scenario.title}</Title>
        <DescriptionList>
          {scenario.descriptions.map((desc, index) => (
            <DescriptionItem key={index} $isLast={index === scenario.descriptions.length - 1}>
              {desc}
            </DescriptionItem>
          ))}
        </DescriptionList>
      </ContentContainer>
    </CardContainer>
  );
};

export default ScenarioCard;
