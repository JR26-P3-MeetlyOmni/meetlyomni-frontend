/**
 * Storybook stories for Auth components
 *
 * This folder contains interactive component documentation for authentication UI elements:
 *
 * ## AuthFormComponents
 * Core form building blocks with consistent theming:
 * - FormContainer: Styled container with responsive design
 * - FormTitle: Typography component for form titles
 * - StyledTextField: Input fields with validation states
 * - SubmitButton: Action buttons with loading states
 * - SectionLabel: Form field labels with proper spacing
 * - Complete form examples showing real-world usage
 *
 * ## PageBackground
 * Common background layout for authentication pages:
 * - Decorative elements (Logo, Icons, Sketch)
 * - Responsive layout with centered content
 * - Full-screen background with proper z-indexing
 *
 * Each story collection includes:
 * - Individual component variations
 * - Interactive demos with state management
 * - Responsive design examples
 * - Complete integration examples
 * - Design system documentation
 *
 * Usage Examples:
 * - Use FormContainer + FormTitle + StyledTextField + SubmitButton for consistent forms
 * - Wrap forms with PageBackground for immersive auth layouts
 * - Reference design constants for consistent spacing and dimensions
 */

export { default as AuthFormComponentsStories } from './AuthFormComponents.stories';
export { default as PageBackgroundStories } from './PageBackground.stories';
