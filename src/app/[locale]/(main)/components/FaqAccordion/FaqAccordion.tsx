'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
  Typography,
} from '@mui/material';

import { getFaqData } from './data';
import { FaqAccordionProps } from './interface';

const StyledTitle = styled('h2')(({ theme }) => ({
  margin: `0 0 ${theme.spacing(6)} 0`,
  fontFamily: theme.typography.fontFamily,
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: 1.2,
  color: '#1a1a1a',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    margin: `0 auto ${theme.spacing(12)} auto`,
    fontSize: '2.5rem',
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  border: 'none',
  backgroundColor: '#f5f5f5',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: theme.spacing(0, 0, 2, 0),
    backgroundColor: '#f5f5f5',
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(3),
    '&.Mui-expanded': {
      margin: theme.spacing(0, 0, 3, 0),
    },
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#666666',
    transition: 'all 0.2s ease-in-out',
    fontSize: '1.25rem',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 5),
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 4, 4),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 5, 5),
  },
}));

const StyledSection = styled('section')(({ theme }) => ({
  padding: `${theme.spacing(8)} 0`,
  backgroundColor: '#ffffff',
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(16)} 0 ${theme.spacing(20)}`,
  },
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: '900px',
  margin: '0 auto',
  padding: `0 ${theme.spacing(2)}`,
  [theme.breakpoints.up('sm')]: {
    padding: `0 ${theme.spacing(3)}`,
  },
}));

const StyledQuestion = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  lineHeight: 1.4,
  color: '#1a1a1a',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
}));

const StyledAnswer = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.6,
  color: '#666666',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}));

const FaqAccordion: React.FC<FaqAccordionProps> = ({ title, faqItems, className }) => {
  const t = useTranslations('LandingPage');

  const [expanded, setExpanded] = useState<string | false>(false);

  const displayFaqItems = faqItems || getFaqData(t);

  const displayTitle = title || t('faq.title');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <StyledSection className={className}>
      <StyledContainer>
        <StyledTitle>{displayTitle}</StyledTitle>

        <Box>
          {displayFaqItems?.map(item => {
            return (
              <StyledAccordion
                key={item.id}
                expanded={expanded === item.id}
                onChange={handleChange(item.id)}
              >
                <StyledAccordionSummary
                  expandIcon={expanded === item.id ? <RemoveIcon /> : <AddIcon />}
                  aria-controls={`${item.id}-content`}
                  id={`${item.id}-header`}
                >
                  <StyledQuestion>{item.question}</StyledQuestion>
                </StyledAccordionSummary>

                <StyledAccordionDetails>
                  <StyledAnswer>{item.answer}</StyledAnswer>
                </StyledAccordionDetails>
              </StyledAccordion>
            );
          })}
        </Box>
      </StyledContainer>
    </StyledSection>
  );
};

export default FaqAccordion;
