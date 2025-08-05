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

// Styled component for the main title of the FAQ section
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

// Styled component for individual accordion items
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  border: 'none',
  backgroundColor: '#f5f5f5', // Gray background for cards
  '&:before': {
    display: 'none', // Remove default border
  },
  '&.Mui-expanded': {
    margin: theme.spacing(0, 0, 2, 0),
    backgroundColor: '#f5f5f5', // Maintain gray background when expanded
  },
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(3),
    '&.Mui-expanded': {
      margin: theme.spacing(0, 0, 3, 0),
    },
  },
}));

// Styled component for the accordion summary (question area)
const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(3, 4),
  '& .MuiAccordionSummary-content': {
    margin: 0, // Remove default margin
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: '#666666', // Light black color for icons
    transition: 'all 0.2s ease-in-out',
    fontSize: '1.25rem',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 5),
  },
}));

// Styled component for accordion details (answer area)
const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0, 4, 4),
  // Removed border line between question and answer
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 5, 5),
  },
}));

// Styled component for the main section container
const StyledSection = styled('section')(({ theme }) => ({
  padding: `${theme.spacing(8)} 0`,
  backgroundColor: '#ffffff', // White background for the section
  [theme.breakpoints.up('sm')]: {
    padding: `${theme.spacing(16)} 0 ${theme.spacing(20)}`,
  },
}));

// Styled component for the content container with max width
const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: '900px',
  margin: '0 auto',
  padding: `0 ${theme.spacing(2)}`,
  [theme.breakpoints.up('sm')]: {
    padding: `0 ${theme.spacing(3)}`,
  },
}));

// Styled component for question text
const StyledQuestion = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  lineHeight: 1.4,
  color: '#1a1a1a',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.25rem',
  },
}));

// Styled component for answer text
const StyledAnswer = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 400,
  lineHeight: 1.6,
  color: '#666666',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}));

// Main FAQ Accordion component
const FaqAccordion: React.FC<FaqAccordionProps> = ({ title, faqItems, className }) => {
  // Hook for internationalization
  const t = useTranslations('LandingPage');

  // State to track which accordion item is expanded
  const [expanded, setExpanded] = useState<string | false>(false);

  // Get FAQ data from props or use default data from translations
  const displayFaqItems = faqItems || getFaqData(t);

  // Get title from props or use default title from translations
  const displayTitle = title || t('faq.title');

  // Handler for accordion expansion/collapse
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <StyledSection className={className}>
      <StyledContainer>
        <StyledTitle>{displayTitle}</StyledTitle>

        <Box>
          {displayFaqItems?.map(item => {
            // Question area with expand/collapse icon
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
