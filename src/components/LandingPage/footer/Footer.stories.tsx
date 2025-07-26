import type { Meta, StoryObj } from '@storybook/nextjs';
import { Box, ThemeProvider, createTheme } from '@mui/material';

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
  argTypes: {
    // Footer doesn't accept props, but we can document its features
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The complete Footer component with all elements: logo, legal links, social icons, QR codes, and copyright.',
      },
    },
  },
};


export const AllScreenSizes: Story = {
  render: () => {
    // Create custom themes that simulate different breakpoints
    const desktopTheme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 768,
          lg: 1200,
          xl: 1536,
        },
      },
    });

    const tabletTheme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900, // Force tablet to use mobile layout
          lg: 1200,
          xl: 1536,
        },
      },
    });

    const mobileTheme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900, // Force mobile to use mobile layout
          lg: 1200,
          xl: 1536,
        },
      },
    });

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
        {/* Desktop View */}
        <Box>
          <Box sx={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            mb: 2, 
            color: '#333',
            textAlign: 'center' 
          }}>
            Desktop (1440px)
          </Box>
          <ThemeProvider theme={desktopTheme}>
            <Box sx={{ 
              width: '1440px', 
              border: '2px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              margin: '0 auto'
            }}>
              <Footer />
            </Box>
          </ThemeProvider>
        </Box>

        {/* Tablet View */}
        <Box>
          <Box sx={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            mb: 2, 
            color: '#333',
            textAlign: 'center' 
          }}>
            Tablet (768px)
          </Box>
          <ThemeProvider theme={tabletTheme}>
            <Box sx={{ 
              width: '768px', 
              border: '2px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              margin: '0 auto',
              // Simulate tablet viewport
              '& footer': {
                '& > div': { // Container
                  '& > div:first-of-type': { // Main content wrapper
                    flexDirection: 'column !important',
                    alignItems: 'center !important',
                    gap: '32px !important',
                  }
                }
              }
            }}>
              <Footer />
            </Box>
          </ThemeProvider>
        </Box>

        {/* Mobile View */}
        <Box>
          <Box sx={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            mb: 2, 
            color: '#333',
            textAlign: 'center' 
          }}>
            Mobile (375px)
          </Box>
          <ThemeProvider theme={mobileTheme}>
            <Box sx={{ 
              width: '375px', 
              border: '2px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              margin: '0 auto',
              // Simulate mobile viewport
              '& footer': {
                '& > div': { // Container
                  '& > div:first-of-type': { // Main content wrapper
                    flexDirection: 'column !important',
                    alignItems: 'center !important',
                    gap: '32px !important',
                  }
                }
              }
            }}>
              <Footer />
            </Box>
          </ThemeProvider>
        </Box>
      </Box>
    );
  },
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

 