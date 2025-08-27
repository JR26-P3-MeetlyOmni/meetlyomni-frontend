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
 * ## AuthBackgroundElements
 * Decorative elements and positioning utilities:
 * - Logo: Brand logo with responsive positioning
 * - Decorative Icons: Star, Mark, Rachel, LookingFor, Glass, FormBackground
 * - TopCenterSketch: Centered decorative element
 * - Shared Components: DecorativeContainer, LogoWrapper, ResponsiveImageWrapper
 * - Configuration: Design system constants and responsive layouts
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
 * - Apply background elements for immersive auth layouts  
 * - Reference design constants for consistent spacing and dimensions
 */

export { default as AuthFormComponentsStories } from './AuthFormComponents.stories';
export { default as AuthBackgroundElementsStories } from './AuthBackgroundElements.stories';