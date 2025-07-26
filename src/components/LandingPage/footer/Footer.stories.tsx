import type { ReactNode } from 'react';

import { Box, createTheme, ThemeProvider } from '@mui/material';

import type { Meta, StoryObj } from '@storybook/nextjs';

import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'LandingPage/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    // Add documentation
    docs: {
      description: {
        component: `
          Footer component for the Meetly Omni landing page. Features:
          - Company logo and branding
          - Legal links (Privacy Policy, Terms of Usage)
          - Social media icons (LinkedIn, Twitter)
          - QR codes for WeChat and Contact Us
          - Copyright information
          - Fully responsive design with mobile-first approach
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The complete Footer component with all elements: logo, legal links, social icons, QR codes, and copyright.',
      },
    },
  },
};

const ScreenSizeLabel = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      fontSize: '18px',
      fontWeight: 'bold',
      mb: 2,
      color: '#333',
      textAlign: 'center',
    }}
  >
    {children}
  </Box>
);

const ScreenContainer = ({
  width,
  children,
  forceMobileLayout = false,
}: {
  width: string;
  children: ReactNode;
  forceMobileLayout?: boolean;
}) => (
  <Box
    sx={{
      width,
      border: '2px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      margin: '0 auto',
      ...(forceMobileLayout && {
        '& footer': {
          '& > div': {
            '& > div:first-of-type': {
              flexDirection: 'column !important',
              alignItems: 'center !important',
              gap: '32px !important',
            },
          },
        },
      }),
    }}
  >
    {children}
  </Box>
);

const desktopTheme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 768, lg: 1200, xl: 1536 },
  },
});

const mobileTheme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
});

export const AllScreenSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
      <Box>
        <ScreenSizeLabel>Desktop (1440px)</ScreenSizeLabel>
        <ThemeProvider theme={desktopTheme}>
          <ScreenContainer width="1440px">
            <Footer />
          </ScreenContainer>
        </ThemeProvider>
      </Box>

      <Box>
        <ScreenSizeLabel>Tablet (768px)</ScreenSizeLabel>
        <ThemeProvider theme={mobileTheme}>
          <ScreenContainer width="768px" forceMobileLayout>
            <Footer />
          </ScreenContainer>
        </ThemeProvider>
      </Box>

      <Box>
        <ScreenSizeLabel>Mobile (375px)</ScreenSizeLabel>
        <ThemeProvider theme={mobileTheme}>
          <ScreenContainer width="375px" forceMobileLayout>
            <Footer />
          </ScreenContainer>
        </ThemeProvider>
      </Box>
    </Box>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
          **View Footer Effects Across All Screen Sizes**

          This story demonstrates the Footer component's responsive behavior across three different screen sizes:

          - **Desktop (1440px)**: Horizontal layout with logo and links on the left, QR codes on the right
          - **Tablet (768px)**: Medium screen adaptation with centered vertical layout
          - **Mobile (375px)**: Vertical stacked layout with all elements center-aligned

          You can see all three size effects simultaneously, making it easy to compare responsive design changes.
        `,
      },
    },
  },
};
