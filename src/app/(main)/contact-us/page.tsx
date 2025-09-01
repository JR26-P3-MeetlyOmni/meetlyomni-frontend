import React from 'react';

import BackgroundDecoration, {
  StyledContainer,
  StyledSubtitle,
  StyledTitle,
} from './components/BackgroundDecoration';
import ContactFormSection from './components/ContactFormSection';

export default function ContactUsPage() {
  return (
    <StyledContainer maxWidth={false}>
      <BackgroundDecoration />
      <StyledTitle>Contact our team</StyledTitle>
      <StyledSubtitle>
        Contact us now to find out how you can make your event more lively and engaging with
        interactive Q&A and live sweepstakes!
      </StyledSubtitle>
      <ContactFormSection />
    </StyledContainer>
  );
}
