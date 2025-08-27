import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import Logo from '../AuthBackgroundElements/Logo';
import StarIcon from '../AuthBackgroundElements/StarIcon';
import MarkIcon from '../AuthBackgroundElements/MarkIcon';
import RachelIcon from '../AuthBackgroundElements/RachelIcon';
import LookingForIcon from '../AuthBackgroundElements/LookingForIcon';
import GlassIcon from '../AuthBackgroundElements/GlassIcon';
import FormBackgroundIcon from '../AuthBackgroundElements/FormBackgroundIcon';
import TopCenterSketch from '../AuthBackgroundElements/TopCenterSketch';
import { 
  DecorativeContainer, 
  LogoWrapper, 
  ResponsiveImageWrapper,
  DECORATIVE_SPACING,
  DECORATIVE_DIMENSIONS 
} from '../AuthBackgroundElements/shared';

// Mock Next.js Image for Storybook
const MockImage = ({ _src, alt, width, height }: { _src: string; alt: string; width: number; height: number }) => (
  <div
    style={{
      width,
      height,
      backgroundColor: '#e0e0e0',
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      color: '#666',
      borderRadius: '4px',
    }}
  >
    {alt}
  </div>
);

// Layout wrapper to show positioning
const LayoutWrapper = ({ children, showGrid = false }: { children: React.ReactNode; showGrid?: boolean }) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      overflow: 'hidden',
      backgroundImage: showGrid 
        ? 'linear-gradient(45deg, #e9ecef 25%, transparent 25%), linear-gradient(-45deg, #e9ecef 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e9ecef 75%), linear-gradient(-45deg, transparent 75%, #e9ecef 75%)'
        : 'none',
      backgroundSize: showGrid ? '20px 20px' : 'auto',
      backgroundPosition: showGrid ? '0 0, 0 10px, 10px -10px, -10px 0px' : 'auto',
    }}
  >
    {children}
  </div>
);

// Logo Stories
const LogoMeta: Meta<typeof Logo> = {
  title: 'Auth/BackgroundElements/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Logo component positioned in the top-left area of authentication pages. Uses responsive positioning.',
      },
    },
  },
  tags: ['autodocs'],
};

export default LogoMeta;

export const LogoDefault: StoryObj<typeof Logo> = {
  render: () => (
    <LayoutWrapper>
      <Logo />
    </LayoutWrapper>
  ),
};

export const LogoWithGrid: StoryObj<typeof Logo> = {
  render: () => (
    <LayoutWrapper showGrid>
      <Logo />
    </LayoutWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo positioned on a grid background to show exact placement',
      },
    },
  },
};

// Decorative Icons Stories
const _IconsMeta: Meta = {
  title: 'Auth/BackgroundElements/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Various decorative icons used as background elements in authentication layouts.',
      },
    },
  },
  tags: ['autodocs'],
};

export const AllIcons: StoryObj = {
  render: function renderAllIcons() {
    return (
      <div style={{ width: '800px', height: '600px', position: 'relative', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
        <Logo />
        <StarIcon />
        <MarkIcon />
        <RachelIcon />
        <LookingForIcon />
        <GlassIcon />
        <FormBackgroundIcon />
        <TopCenterSketch />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All decorative icons positioned together to show the complete background layout',
      },
    },
  },
};

// Helper component for individual icon display
const IconDisplay = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ textAlign: 'center' }}>
    <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>{title}</h3>
    <div style={{ position: 'relative', height: '100px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
      {children}
    </div>
  </div>
);

export const IndividualIcons: StoryObj = {
  render: function renderIndividualIcons() {
    return (
      <div style={{ width: '900px', padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          <IconDisplay title="Logo"><Logo /></IconDisplay>
          <IconDisplay title="Star Icon"><StarIcon /></IconDisplay>
          <IconDisplay title="Mark Icon"><MarkIcon /></IconDisplay>
          <IconDisplay title="Rachel Icon"><RachelIcon /></IconDisplay>
          <IconDisplay title="Looking For Icon"><LookingForIcon /></IconDisplay>
          <IconDisplay title="Glass Icon"><GlassIcon /></IconDisplay>
          <IconDisplay title="Form Background"><FormBackgroundIcon /></IconDisplay>
          <IconDisplay title="Top Sketch"><TopCenterSketch /></IconDisplay>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Individual icons shown separately for detailed inspection',
      },
    },
  },
};

// Shared Components Stories
const _SharedMeta: Meta<typeof DecorativeContainer> = {
  title: 'Auth/BackgroundElements/SharedComponents',
  component: DecorativeContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Shared components and utilities used for positioning and styling background elements.',
      },
    },
  },
  tags: ['autodocs'],
};

export const DecorativeContainerDefault: StoryObj<typeof DecorativeContainer> = {
  args: {
    zIndex: 10,
    opacity: 1,
  },
  render: function renderDecorativeContainerDefault(args) {
    return (
      <div style={{ position: 'relative', width: '300px', height: '200px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
        <DecorativeContainer {...args}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '4px'
          }}>
            Content
          </div>
        </DecorativeContainer>
      </div>
    );
  },
};

export const LogoWrapperDemo: StoryObj = {
  render: function renderLogoWrapperDemo() {
    return (
      <div style={{ position: 'relative', width: '400px', height: '300px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
        <LogoWrapper>
          <MockImage 
            _src="/assets/images/logo.png"
            alt="Demo Logo"
            width={105}
            height={30}
          />
        </LogoWrapper>
      </div>
    );
  },
};

export const ResponsiveImageWrapperDemo: StoryObj = {
  render: function renderResponsiveImageWrapperDemo() {
    return (
      <div style={{ position: 'relative', width: '400px', height: '300px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
        <ResponsiveImageWrapper
          top="20px"
          right="20px"
          imageWidth="80px"
          imageHeight="80px"
        >
          <MockImage 
            _src="/demo.png"
            alt="Demo Image"
            width={80}
            height={80}
          />
        </ResponsiveImageWrapper>
        
        <ResponsiveImageWrapper
          bottom="20px"
          left="20px"
          imageWidth="60px"
          imageHeight="60px"
        >
          <MockImage 
            _src="/demo2.png"
            alt="Demo Image 2"
            width={60}
            height={60}
          />
        </ResponsiveImageWrapper>
      </div>
    );
  },
};

// Configuration and Constants
export const ConfigurationDemo: StoryObj = {
  render: function renderConfigurationDemo() {
    return (
      <div style={{ width: '600px', padding: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Design System Configuration</h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Decorative Spacing</h3>
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '14px' }}>
            <div>LOGO_BASE: {DECORATIVE_SPACING.LOGO_BASE}</div>
            <div>LOGO_SM: {DECORATIVE_SPACING.LOGO_SM}</div>
            <div>LOGO_MD: {DECORATIVE_SPACING.LOGO_MD}</div>
            <div>LOGO_LG_TOP: {DECORATIVE_SPACING.LOGO_LG_TOP}</div>
            <div>LOGO_LG_LEFT: {DECORATIVE_SPACING.LOGO_LG_LEFT}</div>
            <div>SKETCH_TOP: {DECORATIVE_SPACING.SKETCH_TOP}</div>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Decorative Dimensions</h3>
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '14px' }}>
            <div>SKETCH_WIDTH_BASE: {DECORATIVE_DIMENSIONS.SKETCH_WIDTH_BASE}px</div>
            <div>SKETCH_HEIGHT_BASE: {DECORATIVE_DIMENSIONS.SKETCH_HEIGHT_BASE}px</div>
            <div>SKETCH_WIDTH_MD: {DECORATIVE_DIMENSIONS.SKETCH_WIDTH_MD}px</div>
            <div>SKETCH_HEIGHT_MD: {DECORATIVE_DIMENSIONS.SKETCH_HEIGHT_MD}px</div>
            <div>BORDER_RADIUS_MULTIPLIER: {DECORATIVE_DIMENSIONS.BORDER_RADIUS_MULTIPLIER}</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Design system constants used for consistent spacing and dimensions across all background elements',
      },
    },
  },
};

// Layout Examples
export const ResponsiveLayoutDemo: StoryObj = {
  render: function renderResponsiveLayoutDemo() {
    return (
      <div style={{ width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Mobile Layout (320px)</h3>
            <div style={{ width: '320px', height: '200px', position: 'relative', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', margin: '0 auto' }}>
              <Logo />
              <StarIcon />
              <TopCenterSketch />
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Desktop Layout (800px)</h3>
            <div style={{ width: '800px', height: '200px', position: 'relative', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', margin: '0 auto' }}>
              <Logo />
              <StarIcon />
              <MarkIcon />
              <RachelIcon />
              <TopCenterSketch />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive layout examples showing how background elements adapt to different screen sizes',
      },
    },
  },
};