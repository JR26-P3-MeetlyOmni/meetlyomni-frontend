import React from 'react';

import {
  ContentWrapper,
  DecorationImage,
  DescriptionLine1,
  DescriptionLine2,
  DescriptionLine3,
  Heading,
  Highlight,
  Illustration,
  Wrapper,
} from './Branding.style';

const Branding = () => {
  return (
    <Wrapper>
      <Illustration src="/assets/branding-illustration.svg" alt="Meetly Illustration" />
      <ContentWrapper>
        <Heading>
          Get started with <Highlight>Meetly!</Highlight>
        </Heading>
        <DescriptionLine1>Find the perfect time for your meetings in seconds</DescriptionLine1>
        <DescriptionLine2>Never miss a meeting with automated reminders</DescriptionLine2>
        <DescriptionLine3>
          Say goodbye to scheduling conflicts with calendar synchronisation
        </DescriptionLine3>
      </ContentWrapper>
      <DecorationImage src="/assets/8.svg" alt="Branding Decoration" />
    </Wrapper>
  );
};

export default Branding;
