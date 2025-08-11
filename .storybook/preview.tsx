import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import type { Preview } from '@storybook/nextjs-vite';

import '../src/app/globals.css';
import enMessages from '../src/messages/en.json';

export const decorators = [
  Story => (
    <ThemeProvider theme={createTheme()}>
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <Story />
      </NextIntlClientProvider>
    </ThemeProvider>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
