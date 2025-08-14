'use client';

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

import { getFaqData } from '../../../../constants/FaqData';
import { FaqAccordionProps } from './types';

const StyledTitle = styled(Typography)(({ theme }) => ({
  margin: `0 0 ${theme.spacing(6)} 0`,
  fontSize: theme.typography.pxToRem(36), // Replace'36px'
  fontWeight: theme.typography.fontWeightBold, // Replace 'bold'
  lineHeight: theme.typography.body1.lineHeight, // Replace 'normal'
  color: theme.palette.text.primary, // Replace '#14183b'
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    margin: `0 auto ${theme.spacing(12)} auto`,
    fontSize: theme.typography.pxToRem(36), // Keep font size consistent using pxToRem
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
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
    color: theme.palette.text.secondary, // Replace '#5f6369'
    transition: theme.transitions.create('all', {
      // Replace 'all 0.2s ease-in-out'
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
    fontSize: theme.typography.body1.fontSize,
    '& svg, & .MuiSvgIcon-root': {
      width: theme.typography.pxToRem(16), // Replace '16px'
      height: theme.typography.pxToRem(16),
    },
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 5),
  },
}));

// AccordionDetails
const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 4, 4),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 5, 5),
  },
}));

// Section
const StyledSection = styled('section')(({ theme }) => ({
  padding: `${theme.spacing(8)} 0`,
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(16)} 0 ${theme.spacing(20)}`,
  },
}));

// Container
const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.md,
  margin: '0 auto',
  padding: `0 ${theme.spacing(2)}`,
  [theme.breakpoints.up('sm')]: {
    padding: `0 ${theme.spacing(3)}`,
  },
}));

// Question
const StyledQuestion = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(20), // Replace 20px
  fontWeight: theme.typography.fontWeightMedium, // Replace 500
  lineHeight: theme.typography.body1.lineHeight, // Replace 1.5
  color: theme.palette.text.primary, // Replace '#14183b'
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(20),
  },
}));

// Answer
const StyledAnswer = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16), // Replace16px
  fontWeight: theme.typography.fontWeightRegular, // Replace 'normal'
  lineHeight: theme.typography.body2.lineHeight, // Replace 1.25
  color: theme.palette.text.secondary, // replace '#888e98'
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(16),
  },
}));

const FaqAccordion: React.FC<FaqAccordionProps> = ({ title, faqItems, className }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const displayFaqItems = faqItems || getFaqData();

  const displayTitle = title || 'Frequently Asked Questions';

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
