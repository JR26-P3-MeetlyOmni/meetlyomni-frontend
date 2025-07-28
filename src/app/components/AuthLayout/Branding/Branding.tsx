// src/app/components/AuthLayout/Branding/Branding.tsx
import React from 'react';

import { Description, Heading, Highlight, Illustration, Wrapper } from './Branding.style';

const Branding = () => {
  return (
    <Wrapper>
      <div>
        <Illustration src="/assets/branding-illustration.svg" alt="Meetly Illustration" />
        <Heading>
          Get started with <Highlight>Meetly</Highlight>!
        </Heading>
        <Description>Find the perfect time for your meetings in seconds</Description>
        <Description>Never miss a meeting with automated reminders</Description>
        <Description>Say goodbye to scheduling conflicts with calendar synchronisation</Description>
      </div>
    </Wrapper>
  );
};

export default Branding;
