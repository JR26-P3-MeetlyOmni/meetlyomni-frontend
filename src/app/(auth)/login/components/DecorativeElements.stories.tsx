import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// Mock Next.js Image component for Storybook
const MockImage = ({ src, alt, width, height, style, ...props }: any) => (
  <img 
    src={src} 
    alt={alt} 
    width={width} 
    height={height} 
    style={{ 
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
      ...style 
    }}
    {...props} 
  />
);

// Apply mock globally for this story
require('next/image').default = MockImage;

import { DecorativeElements } from './DecorativeElements';

const meta: Meta<typeof DecorativeElements> = {
  title: 'Components/Auth/DecorativeElements',
  component: DecorativeElements,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    docs: {
      description: {
        component: 'Decorative elements for the login page including the Omni logo, character illustrations, and background sketch. These elements are positioned absolutely to create an engaging and visually appealing login experience.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ 
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
      }}>
        <Story />
        {/* Helper grid for positioning reference */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 99px, rgba(0,0,0,0.03) 100px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 99px, rgba(0,0,0,0.03) 100px)
          `,
          pointerEvents: 'none',
          zIndex: 1000,
          opacity: 0.3,
        }} />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All decorative elements positioned as they appear on the login page. Includes logo, character illustrations, background sketch, and various decorative images.',
      },
    },
  },
};

export const WithoutGrid: Story = {
  decorators: [
    (Story) => (
      <div style={{ 
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
      }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Decorative elements without the positioning grid for a cleaner view.',
      },
    },
  },
};

export const LogoOnly: Story = {
  render: () => {
    const MockImage = require('next/image').default;
    return (
      <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
        <MockImage src="/assets/images/LogIn/logo.png" alt="Omni Logo" width={105} height={30} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the Omni logo positioned at the top-left corner.',
      },
    },
  },
};

export const CharactersOnly: Story = {
  render: () => {
    const MockImage = require('next/image').default;
    return (
      <>
        {/* Rachel */}
        <div style={{ 
          position: 'absolute', 
          top: '15vh', 
          right: '8vw', 
          zIndex: 2,
        }}>
          <MockImage 
            src="/assets/images/LogIn/rachel.png" 
            alt="Rachel" 
            width={209.3} 
            height={97.2}
            style={{ width: 'min(209px, 18vw)', height: 'auto' }}
          />
        </div>
        
        {/* Mark */}
        <div style={{ 
          position: 'absolute', 
          bottom: '20vh', 
          left: '8vw', 
          zIndex: 2,
        }}>
          <MockImage 
            src="/assets/images/LogIn/mark.png" 
            alt="Mark" 
            width={209.3} 
            height={97.2}
            style={{ width: 'min(209px, 18vw)', height: 'auto' }}
          />
        </div>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the character illustrations (Rachel and Mark) positioned on the sides.',
      },
    },
  },
};

export const BackgroundElementsOnly: Story = {
  render: () => {
    const MockImage = require('next/image').default;
    return (
      <>
        {/* Top Center Sketch */}
        <div style={{
          position: 'absolute',
          top: '64px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(300px, 25vw)',
          height: 'min(180px, 15vh)',
          backgroundColor: 'rgba(158, 158, 158, 0.3)',
          borderRadius: '4px',
          opacity: 0.38,
          zIndex: 1,
        }} />
        
        {/* Form background */}
        <div style={{ 
          position: 'absolute', 
          top: '12vh', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 1, 
          opacity: 0.8,
        }}>
          <MockImage 
            src="/assets/images/LogIn/form.png" 
            alt="Form" 
            width={460} 
            height={337}
            style={{ width: 'min(460px, 35vw)', height: 'auto' }}
          />
        </div>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the background elements including the top sketch and form background.',
      },
    },
  },
};

export const SmallElementsOnly: Story = {
  render: () => {
    const MockImage = require('next/image').default;
    return (
      <>
        {/* Magnifying glass */}
        <div style={{ 
          position: 'absolute', 
          top: '25vh', 
          left: '8vw', 
          zIndex: 1, 
          opacity: 0.7,
        }}>
          <MockImage 
            src="/assets/images/LogIn/glass.png" 
            alt="Magnifying glass" 
            width={84} 
            height={84}
            style={{ width: 'min(84px, 6vw)', height: 'min(84px, 6vw)' }}
          />
        </div>
        
        {/* Looking For text */}
        <div style={{ 
          position: 'absolute', 
          top: '50vh', 
          right: '12vw', 
          zIndex: 1, 
          opacity: 0.8,
        }}>
          <MockImage 
            src="/assets/images/LogIn/lookingFor.png" 
            alt="Looking For" 
            width={179} 
            height={42}
            style={{ width: 'min(179px, 15vw)', height: 'auto' }}
          />
        </div>
        
        {/* Star */}
        <div style={{ 
          position: 'absolute', 
          bottom: '8vh', 
          right: '25vw', 
          zIndex: 1, 
          opacity: 0.8,
        }}>
          <MockImage 
            src="/assets/images/LogIn/star.png" 
            alt="Star" 
            width={72} 
            height={72}
            style={{ width: 'min(72px, 5vw)', height: 'min(72px, 5vw)' }}
          />
        </div>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Only the smaller decorative elements: magnifying glass, "Looking For" text, and star.',
      },
    },
  },
};

// Responsive stories
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
    docs: {
      description: {
        story: 'Decorative elements optimized for mobile viewport (iPhone 6). Notice how elements scale and reposition.',
      },
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
    docs: {
      description: {
        story: 'Decorative elements on tablet viewport (iPad). Shows medium-sized responsive behavior.',
      },
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Decorative elements on desktop viewport with full spacing and positioning.',
      },
    },
  },
};

// Layer visualization
export const LayerVisualization: Story = {
  render: () => {
    const MockImage = require('next/image').default;
    return (
      <>
        {/* Z-index 1 elements with red border */}
        <div style={{ 
          position: 'absolute', 
          top: '64px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          border: '2px solid red',
          zIndex: 1,
        }}>
          <div style={{
            width: 'min(300px, 25vw)',
            height: 'min(180px, 15vh)',
            backgroundColor: 'rgba(158, 158, 158, 0.3)',
            borderRadius: '4px',
            opacity: 0.38,
          }} />
          <div style={{ 
            position: 'absolute', 
            top: '-30px', 
            left: 0, 
            background: 'red', 
            color: 'white', 
            padding: '2px 6px', 
            fontSize: '12px',
            borderRadius: '2px',
          }}>
            Z-INDEX: 1
          </div>
        </div>
        
        {/* Z-index 2 elements with blue border */}
        <div style={{ 
          position: 'absolute', 
          top: '15vh', 
          right: '8vw', 
          border: '2px solid blue',
          zIndex: 2,
        }}>
          <MockImage src="/assets/images/LogIn/rachel.png" alt="Rachel" width={209.3} height={97.2} />
          <div style={{ 
            position: 'absolute', 
            top: '-30px', 
            left: 0, 
            background: 'blue', 
            color: 'white', 
            padding: '2px 6px', 
            fontSize: '12px',
            borderRadius: '2px',
          }}>
            Z-INDEX: 2
          </div>
        </div>
        
        {/* Z-index 10 elements with green border */}
        <div style={{ 
          position: 'absolute', 
          top: '24px', 
          left: '24px', 
          border: '2px solid green',
          zIndex: 10,
        }}>
          <MockImage src="/assets/images/LogIn/logo.png" alt="Omni Logo" width={105} height={30} />
          <div style={{ 
            position: 'absolute', 
            top: '-30px', 
            left: 0, 
            background: 'green', 
            color: 'white', 
            padding: '2px 6px', 
            fontSize: '12px',
            borderRadius: '2px',
          }}>
            Z-INDEX: 10
          </div>
        </div>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Visualization of the layering system with z-index values highlighted. Shows which elements stack above others.',
      },
    },
  },
};

// Animation demo (simulated)
export const AnimationDemo: Story = {
  decorators: [
    (Story) => (
      <div style={{ 
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden',
      }}>
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.8); }
              to { opacity: 1; transform: scale(1); }
            }
            .animated-elements img {
              animation: float 3s ease-in-out infinite;
            }
            .animated-elements > div {
              animation: fadeIn 0.8s ease-out;
            }
          `}
        </style>
        <div className="animated-elements">
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Decorative elements with subtle animations (floating effect). This demonstrates how the elements could be enhanced with motion.',
      },
    },
  },
};

// High contrast version
export const HighContrast: Story = {
  decorators: [
    (Story) => (
      <div style={{ 
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        overflow: 'hidden',
        filter: 'contrast(200%) brightness(150%)',
      }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'High contrast version for accessibility testing. Shows how decorative elements appear with enhanced contrast.',
      },
    },
  },
};
