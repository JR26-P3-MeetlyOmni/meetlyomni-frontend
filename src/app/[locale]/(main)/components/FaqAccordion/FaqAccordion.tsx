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

const StyledTitle = styled(Typography)(({ theme }) => ({
  margin: `0 0 ${theme.spacing(6)} 0`,
  fontSize: '36px',
  fontWeight: 'bold',
  lineHeight: 'normal',
  color: '#14183b',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    margin: `0 auto ${theme.spacing(12)} auto`,
    fontSize: '36px',
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  border: 'none',
  backgroundColor: theme.palette.grey[100],
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: theme.spacing(0, 0, 2, 0),
    backgroundColor: theme.palette.grey[100],
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
    color: '#5f6369',
    transition: 'all 0.2s ease-in-out',
    fontSize: theme.typography.body1.fontSize,
    '& svg': {
      width: '16px',
      height: '16px',
    },
    '& .MuiSvgIcon-root': {
      width: '16px',
      height: '16px',
    },
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
  backgroundColor: theme.palette.background.default,
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
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: 'normal',
  color: '#14183b',
  [theme.breakpoints.up('sm')]: {
    fontSize: '20px',
  },
}));

const StyledAnswer = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'normal',
  lineHeight: 1.25,
  color: '#888e98',
  [theme.breakpoints.up('sm')]: {
    fontSize: '16px',
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
        <StyledTitle variant="h2">{displayTitle}</StyledTitle>

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
