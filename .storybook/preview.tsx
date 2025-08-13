import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import type { Preview } from '@storybook/nextjs';

import '../src/app/globals.css';

export const decorators = [
  Story => (
    <ThemeProvider theme={createTheme()}>
      <Story />
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
